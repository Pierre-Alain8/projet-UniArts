import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../scss/officeArticle.scss";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

const useStyles = makeStyles((theme) => ({
  saveArticle: {
    backgroundColor: "rgb(64, 64, 64)",
    color: "rgb(255, 255, 255)",
    marginTop: "0.8rem;",
  },
}));

const OfficeArticle = (props) => {
  const classes = useStyles();
  const [values, setValues] = useState({ title: "", content: "" });

  const formArticleBool = useSelector((state) => state.formArticleBool);
  const formActive = useSelector((state) => state.formActive);

  const dispatch = useDispatch();

  const handleChangeArticle = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value }, console.log(name));
  };

  const addNewArticle = () => {
    dispatch({ type: "SHOW_FORM_ARTICLE_BOOL", formActive: props.formActive });
    console.log("ajout form :", formArticleBool);
  };

  const cancelNewArticle = (event) => {
    event.preventDefault();
    dispatch({ type: "CANCEL_FORM_ARTICLE_BOOL", form: props.form });
    console.log("annulation form:", formArticleBool);
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
        className={
          formArticleBool === true
            ? "form-article" + formActive
            : "form-article"
        }
      >
        <input
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
        />

        <label htmlFor="add-image">
          <Button className="add-image-article" component="span">
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

        <Button
          className={classes.saveArticle}
          type="submit"
          variant="contained"
          startIcon={<SaveIcon />}
        >
          enregistrer
        </Button>

        <button onClick={cancelNewArticle}>Annuler</button>
      </form>

      <div className="list-article"></div>
    </div>
  );
};

export default OfficeArticle;
