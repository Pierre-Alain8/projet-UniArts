import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import { withRouter } from "react-router-dom";

const Article = (props) => {
  const [article, setArticle] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/user/adm/getArticleById/ + ${article.id}`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setArticle(res);

        console.log("getArticleById", res);
      })
      .catch((error) => console.log(error));
  }, [article]);

  return (
    <section className="article-page">
      <div className="article-container">
        <div className="cover-article">
          <img
            src={"http://localhost:5000/uploads/" + article.img}
            alt={article.img}
          />
        </div>

        <div className="article-content">
          <h2>{article.title}</h2>
          {parse(article.content)}
        </div>
      </div>
    </section>
  );
};

export default withRouter(Article);
