import React, { useState, useEffect } from "react";
import DiscoveryArticle from "./discoveryArticle";
import "../../scss/discovery.scss";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

const Discovery = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    let token = localStorage.getItem("token");

    fetch(`http://localhost:5000/user/adm/getAllArticles`, {
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
  }, []);

  return (
    <section className="section-discovery-page">
      <article className="article-presentation">
        <h1>Un collectif d'artises francophones...</h1>

        <p>
          UniArts est un collectif ayant pour objectif de mettre en avant divers
          artistes francophones meritant plus de visibilités, Sur Uniarts, vous
          pourrez retrouver ces différents artistes, les découvrir grâce à des
          articles de présentations ,visiter leurs profils pour mieux les
          connaître...
        </p>
      </article>

      <div className="list-discovery-article">
        <span className="list-discovery-title">
          <h2>LES ARTICLES</h2>
        </span>
        <div className="list-discovery-content">
          <div className="list-discovery-article">
            <div className="article-discovery">
              {articles.map((article, index) => {
                return <DiscoveryArticle key={index} article={article} />;
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="button-discovery-list">
        <button>Liste des articles</button>

        <button>Liste des artistes</button>
      </div>
    </section>
  );
};
Discovery.propTypes = {
  article: PropTypes.array,
};
Discovery.defaultProps = {
  article: [],
};
export default withRouter(Discovery);
