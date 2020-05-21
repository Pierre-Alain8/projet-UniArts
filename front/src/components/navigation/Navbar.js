import React from "react";
import NavMenu from "./NavMenu";
import { withRouter } from "react-router-dom";
import "../../css/navbar.css";

const Navbar = (props) => {
  const handleClickHome = () => {
    props.history.push("/");
  };

  const logOut = () => {
    localStorage.removeItem("token");
    props.history.push("/");
  };

  return (
    <div className="menu-contenair">
      <div onClick={handleClickHome} className="logo-contenair">
        <p>UNIARTS</p>
      </div>
      <NavMenu logOut={logOut} />
    </div>
  );
};

export default withRouter(Navbar);
