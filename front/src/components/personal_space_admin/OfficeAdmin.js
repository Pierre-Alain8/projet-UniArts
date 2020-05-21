import React from "react";
import TabsOfficeAdmin from "./TabsOfficeAdmin";
import "../../css/officeAdmin.css";
import decode from "jwt-decode";
import { withRouter } from "react-router-dom";

const OfficeAdmin = (props) => {
  let getToken = localStorage.getItem("token");
  const decoded = decode(getToken);

  if (decoded.role !== "Admin") {
    props.history.push("/");
  }

  return (
    <div className="office-admin">
      <TabsOfficeAdmin />
    </div>
  );
};

export default withRouter(OfficeAdmin);
