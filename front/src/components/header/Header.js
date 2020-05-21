import React from "react";
import "../../css/header.css";
import { withRouter } from "react-router-dom";
import Navbar from "../navigation/Navbar";

const Header = () => {
  return (
    <section className="header-Uniarts">
      <div className="header-contenair">
        <Navbar />
      </div>
    </section>
  );
};

export default withRouter(Header);
