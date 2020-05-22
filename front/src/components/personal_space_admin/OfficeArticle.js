import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../scss/officeArticle.scss";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

const useStyles = makeStyles((theme) => ({
  saveArticle: {
    backgroundColor: "rgb(64, 64, 64)",
    color: "rgb(255, 255, 255)",
    marginTop: "0.8rem;",
  },

  cancelArticle: {
    backgroundColor: "rgb(64, 64, 64)",
    color: "rgb(255, 255, 255)",
    marginTop: "0.8rem;",
  },
}));

const OfficeArticle = (props) => {
  // states
  const classes = useStyles();
  const [values, setValues] = useState({ title: "", content: "" });
  const [file, setFile] = useState("");
  const [articles, setArticles] = useState([]);

  // useSelector consiste à rappeler un state général définis dans le store
  const formArticleBool = useSelector((state) => state.formArticleBool);
  const formActive = useSelector((state) => state.formActive);

  // Rappel des actions Redux:
  const dispatch = useDispatch();

  // Méthodes

  const addNewArticle = () => {
    dispatch({ type: "SHOW_FORM_ARTICLE_BOOL", formActive: props.formActive });
  };

  const cancelNewArticle = (event) => {
    event.preventDefault();
    dispatch({ type: "CANCEL_FORM_ARTICLE_BOOL", form: props.form });
  };

  const handleChangeArticle = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value }, console.log(name));
  };

  const handleChangeImage = (event) => {
    setFile(event.target.files[0]);
  };

  const subFormArticle = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    let token = localStorage.getItem("token");
    let newArticle = [...articles, values];

    let data = new FormData();
    data.append("image", file);
    data.append("title", values.title);
    data.append("content", values.content);

    fetch(`http://localhost:5000/user/adm//addArticle`, {
      headers: {
        Authorization: "Bearer " + token,
      },
      method: "POST",
      body: data,
    })
      .then((res) => {
        if (res.status === 200) {
          res.json().then((res) => {
            setArticles(newArticle);
            console.log(res);
          });
        } else {
          console.log(res);
          console.log("hello");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="office-article">
      <div className="office-title">
        <h2>Publications d'articles</h2>
      </div>

      <div className="button-article-container">
        <button onClick={addNewArticle} className="button-article">
          AJOUTER UN ARTICLE
        </button>
      </div>

      <form
        className={formArticleBool === true ? formActive : "form-article"}
        onSubmit={subFormArticle}
      >
        <input
          className="input-title"
          type="text"
          name="title"
          value={values.title}
          onChange={handleChangeArticle}
          placeholder="title of article"
        />

        <input
          style={{ display: "none" }}
          id="add-image"
          type="file"
          name="image"
          placeholder="sélectionner une image"
          onChange={handleChangeImage}
        />

        <label htmlFor="add-image">
          <Button className="add-image-article" component="span">
            ajouter une image
            <PhotoCamera />
          </Button>
        </label>

        <textarea
          id="content"
          name="content"
          wrap="off"
          rows="10"
          cols="50"
          value={values.content}
          onChange={handleChangeArticle}
          placeholder="enter the text of article..."
        />
        <span className="buttons-form">
          <Button
            className={classes.saveArticle}
            type="submit"
            variant="contained"
            startIcon={<SaveIcon />}
          >
            enregistrer
          </Button>

          <Button
            className={classes.cancelArticle}
            startIcon={<CancelIcon />}
            onClick={cancelNewArticle}
          >
            Annuler
          </Button>
        </span>
      </form>

      <div className="list-article"></div>
    </div>
  );
};

export default OfficeArticle;
