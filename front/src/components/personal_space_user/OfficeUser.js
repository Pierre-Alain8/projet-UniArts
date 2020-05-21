import React, { useEffect } from "react";
import decode from "jwt-decode";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import TabsOfficeUser from "./TabsOfficeUser";
import "../../scss/officeUser.scss";

const OfficeUser = (props) => {
  let getToken = localStorage.getItem("token");
  const decoded = decode(getToken);

  if (decoded.role !== "Artiste") {
    props.history.push("/");
  }

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) props.history.push("/");
  });

  return (
    <section className="officeUser">
      <TabsOfficeUser />
    </section>
  );
};

OfficeUser.propsTypes = {
  history: PropTypes.string,
};

OfficeUser.defaultProps = {
  history: "",
};
export default withRouter(OfficeUser);
