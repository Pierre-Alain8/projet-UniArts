import React, { useState, useEffect } from "react";
import ArticlesPost from "./ArticlesPost";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import "../../scss/officeArticle.scss";
import { Editor } from "@tinymce/tinymce-react";
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

  const getArticles = () => {
    let token = localStorage.getItem("token");

    return fetch(`http://localhost:5000/user/adm/getAllArticles`, {
      headers: {
        Authorization: "Bearer " + token,
      },
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setArticles(res.articleId);

        console.log("getAllArticles ", res);
        console.log("articles: ", res.articleId);
      })
      .catch((error) => console.log(error));
  };

  // ComponentDitMount, ComponentWillMount & ComponentDitUpdate:
  useEffect(() => {
    getArticles()
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setArticles(res.articleId);

        console.log("getAllArticles ", res);
        console.log("articles: ", res.articleId);
      })
      .catch((error) => console.log(error));
  }, []);

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

  const handleEditorChange = (content, editor) => {
    setValues({ ...values, content });
    console.log("contenue article:", values);
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
    <section className="office-article">
      <div className="office-title">
        <h2>Publications d'articles</h2>
      </div>

      <div className="button-article-container">
        <button onClick={addNewArticle} className="show-article">
          AJOUTER UN ARTICLE
        </button>
      </div>

      <div className="form-container">
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

          <div className="editor-article">
            <Editor
              name="content"
              initialValue="<p>This is the initial content of the editor</p>"
              apiKey="g4yqdpo1so4x0pnr2jl6g2i1zoiu3mmyyhwkr5xmbz95bm6f"
              init={{
                width: "100%",
                height: "100%",
                menubar: false,
              }}
              onEditorChange={handleEditorChange}
            />
          </div>

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
      </div>
      <div className="list-article">
        <div className="list-article-title">
          <h2>Articles publiés</h2>
        </div>
        {articles.map((article, index) => {
          return <ArticlesPost key={index} article={article} />;
        })}
      </div>
    </section>
  );
};

OfficeArticle.propTypes = {
  article: PropTypes.array,
};

OfficeArticle.defaultProps = {
  article: [],
};

export default OfficeArticle;
