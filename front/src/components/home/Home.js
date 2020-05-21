import React from "react";
import PreviewsArticles from "./PreviewsArticles";
import { withRouter } from "react-router-dom";
import "../../scss/home.scss";

const Home = (props) => {
  const handleClickRegister = () => {
    props.history.push("/RegisterUser");
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
    </section>
  );
};

export default withRouter(Home);
