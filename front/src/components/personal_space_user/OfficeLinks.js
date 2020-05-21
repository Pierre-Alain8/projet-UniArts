import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Links from "./Links";
import "../../css/officeLinks.css";

const OfficeLinks = (props) => {
  const [links, setLinks] = useState([]);
  const [message, setMessage] = useState("");
  const [values, setValues] = useState({ linkTitle: "", linkContent: "" });

  const getLink = () => {
    let token = localStorage.getItem("token");

    return fetch(`http://localhost:5000/user/getAllLinks`, {
      headers: {
        Authorization: "Bearer " + token,
      },
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setLinks(res.linkId);

        console.log("getAllLinks: ", res);
        console.log("Links: ", res.linkId);
      })
      .catch((error) => console.log(error));
  };

  // ComponentDitMount & ComponentDitUpdate:
  useEffect(() => {
    getLink()
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setLinks(res.linkId);

        console.log("getLinks: ", res);
        console.log("Links: ", res.linkId);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChangeLink = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value }, console.log(name));
  };

  const subformLink = (event) => {
    let token = localStorage.getItem("token");
    let newLinks = [...links, values];
    event.preventDefault();

    fetch(`http://localhost:5000/user/addLink`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      method: "POST",
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (res.status === 200) {
          res.json().then((res) => {
            setMessage("votre lien a été enregistré avec succès !");
            setLinks(newLinks);
            console.log(res);
          });
        } else {
          console.log(res);
          console.log("hello");
        }
      })
      .then(() => {
        getLink();
      });
  };

  return (
    <div className="office-links">
      <div className="form-link-contenair">
        <h1 className="office-links-title">AJOUTER UN NOUVEAU LIEN</h1>

        <form className="form-link" onSubmit={subformLink}>
          <input
            type="text"
            name="linkTitle"
            onChange={handleChangeLink}
            value={values.linkTitle}
            placeholder="add title of links"
          />

          <input
            type="text"
            name="linkContent"
            onChange={handleChangeLink}
            value={values.linkContent}
            placeholder="add the content of link"
          />
          <button className="button-save-project" type="submit">
            Enregistrer
          </button>
          <span>{message}</span>
        </form>
      </div>

      <div className="list-links">
        {links.map((link, index) => {
          return <Links key={index} link={link} getLink={getLink} />;
        })}
      </div>
    </div>
  );
};
OfficeLinks.propTypes = {
  link: PropTypes.array,
};

OfficeLinks.defaultProps = {
  link: [],
};

export default OfficeLinks;
