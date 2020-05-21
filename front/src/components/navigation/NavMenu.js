import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const NavMenu = (props) => {
  // useSelector consiste à rappeler un state général définis dans le store
  const navMenuBool = useSelector((state) => state.navMenuBool);

  // Rappel des actions Redux:
  const dispatch = useDispatch(); // useDispatch consiste à activer les actions du reducer (liste de nos actions)

  // state
  const [token] = useState(localStorage.getItem("token"));
  const [anchorEl, setAnchorEl] = React.useState(null);

  // méthodes:
  const showMenu = (event) => {
    setAnchorEl(event.currentTarget);
    dispatch({ type: "OPEN_NAV_MENU_BOOL" });
  };

  const handleClose = () => {
    setAnchorEl(null);
    dispatch({ type: "CLOSE_NAV_MENU_BOOL" });
  };

  const logOut = () => {
    dispatch({ type: "CLOSE_NAV_MENU_BOOL" });
    props.logOut();
  };

  let userAccount = null;
  let userProfile = null;
  let userLogOut = null;

  if (token) {
    let decoded = jwtDecode(token);

    userAccount =
      decoded.role === "Artiste" ? (
        <MenuItem onClick={handleClose}>
          <Link className="nav-links" to="/OfficeUser">
            MON COMPTE
          </Link>
        </MenuItem>
      ) : null;

    userProfile =
      decoded.role === "Artiste" ? (
        <MenuItem onClick={handleClose}>
          <Link className="nav-links" to="/ProfileUser">
            MON PROFILE
          </Link>
        </MenuItem>
      ) : null;

    userLogOut =
      decoded.role === "Artiste" ? (
        <MenuItem onClick={logOut}>
          <button className="nav-logOut">DECONEXION</button>
        </MenuItem>
      ) : null;
  }

  return (
    <div className="burgerMenu">
      <div
        className="barMenu"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={showMenu}
      >
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>

      <Menu
        id="simple-menu"
        keepMounted
        anchorEl={anchorEl}
        open={navMenuBool}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link className="nav-links" to="/">
            HOME
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link className="nav-links" to="/">
            ARTICLES
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link className="nav-links" to="/">
            LES ARTISTES
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link className="nav-links" to="/">
            ARCHIVE
          </Link>
        </MenuItem>
        {userAccount}
        {userProfile}
        {userLogOut}
      </Menu>
    </div>
  );
};

NavMenu.propsTypes = {
  logOut: PropTypes.func,
};

NavMenu.defaultProps = {
  logOut: () => {},
};

export default NavMenu;
