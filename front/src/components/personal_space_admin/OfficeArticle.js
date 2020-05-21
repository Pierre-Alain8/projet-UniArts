import React, { useState, useEffect } from "react";

const OfficeArticle = (props) => {
  const [display, setDislay] = useState("none");
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
      <button onClick={addNewArticle} className="button-article">
        Ajouter un article
      </button>

      <form className="form-article" style={{ display: display }}>
        <input
          type="text"
          name="title"
          value={values.title}
          onChange={handleChangeArticle}
          placeholder="title of article"
        />

        <input
          id="image"
          type="file"
          name="image"
          placeholder="sélectionner une image"
        />

        <textarea
          id="content"
          name="content"
          rows="5"
          cols="33"
          value={values.content}
          onChange={handleChangeArticle}
          placeholder="enter the text of article..."
        />

        <button className="" type="submit">
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default OfficeArticle;
