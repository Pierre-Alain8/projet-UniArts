import React, { useState, useEffect } from "react";
import "../../scss/officeArticle.scss";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

const useStyles = makeStyles((theme) => ({
  saveArticle: {
    backgroundColor: "rgb(64, 64, 64)",
    color: "rgb(231, 234, 239)",
    margin: "0.8rem;",
  },
}));

const OfficeArticle = (props) => {
  const classes = useStyles();
  const [values, setValues] = useState({ title: "", content: "" });

  const handleChangeArticle = (event) => {
    // l'évenement permettant de ciblier les valeurs des inputs
    const { name, value } = event.target;
    setValues({ ...values, [name]: value }, console.log(name));
    // récupération des valeurs de manières indépendantes
  };

  const addNewArticle = () => {};

  return (
    <div className="office-article">
      <div className="button-article-container">
        <button onClick={addNewArticle} className="button-article">
          Ajouter un article
        </button>
      </div>

      <form className="form-article">
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
          rows="5"
          cols="33"
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
      </form>
    </div>
  );
};

export default OfficeArticle;
