import React from "react";
import PreviewsArticles from "./PreviewsArticles";
import { withRouter } from "react-router-dom";
import "../../scss/home.scss";
const Home = (props) => {
  const handleClickRegister = () => {
    props.history.push("/RegisterUser");
  };

  const handleClickDiscovery = () => {
    props.history.push("/DiscoveryPage");
  };

  return (
    <section className="home-uniarts">
      <div className="title-home">
        <h1>UNIARTS</h1>
      </div>

      <div className="link-register">
        <button className="button-link-register" onClick={handleClickRegister}>
          Rejoindre le collectif
        </button>
        <div className="arrow-link">
          <img
            src="img/arrow-right.png"
            alt="Vous voulez rejoindre le collectif ?"
          />
        </div>
      </div>

      <PreviewsArticles />

      <div className="link-discovery">
        <h1 onClick={handleClickDiscovery}>Découvrir le collectif</h1>
        <div className="arrow-link-discovery">
          <img
            src="img/arrow-right.png"
            alt="Vous voulez rejoindre le collectif ?"
          />
        </div>
      </div>
    </section>
  );
};

export default withRouter(Home);
