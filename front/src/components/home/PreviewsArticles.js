import React, { useState, useEffect } from "react";
import "../../scss/previewsAricles.scss";
import PropTypes from "prop-types";

const PreviewsArticles = (props) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/user/adm/getAllArticles`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setArticles(res);

        console.log("getAllArticles ", res);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <article className="random-reviews">
      {articles &&
        articles.map((article, index) => {
          return (
            <div
              className="random-articles"
              style={{
                backgroundImage: `url(${
                  "http://localhost:5000/uploads/" + article.image
                })`,
              }}
              key={index}
              id={article.id}
            >
              <div className="title-preview">
                <h2>{article.title}</h2>
              </div>
              <div className="button-preview">
                <button className="button-preview-article">
                  En savoir plus
                </button>
              </div>
            </div>
          );
        })}
    </article>
  );
};
PreviewsArticles.propTypes = {
  article: PropTypes.array,
};
PreviewsArticles.defaultProps = {
  article: [],
};

export default PreviewsArticles;
