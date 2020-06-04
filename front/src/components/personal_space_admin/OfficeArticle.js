import React from "react";

import FormAddArticle from "./FormAddArticle";
import { useDispatch } from "react-redux";
import "../../scss/officeArticle.scss";

const OfficeArticle = (props) => {
  // Rappel des actions Redux:
  const dispatch = useDispatch();

  // Méthodes
  const addNewArticle = () => {
    dispatch({ type: "SHOW_FORM_ARTICLE_BOOL", formActive: props.formActive });
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
      <FormAddArticle />
    </section>
  );
};

export default OfficeArticle;
