import React from "react";
import PropTypes from "prop-types";

const DiscoveryArticle = (props) => {
  const { article } = props;

  return (
    <div className="list-content">
      <div className="cover-article-container">
        <div className="cover-article">
          <img
            src={"http://localhost:5000/uploads/" + article.image}
            alt="cover article"
          />
        </div>
      </div>

      <div className="article-discovery-content">
        <span className="article-discovery-text">
          <h3>{article.title}</h3>
        </span>

        <span className="button-read-container">
          <button>read more</button>
        </span>
      </div>
    </div>
  );
};

DiscoveryArticle.propTypes = {
  article: PropTypes.object,
};
DiscoveryArticle.defaultProps = {
  article: {},
};

export default DiscoveryArticle;
