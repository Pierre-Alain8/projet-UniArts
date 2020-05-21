import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../../css/officeProfile.css";

const OfficeProfile = (props) => {
  // les states & setState:
  const [values, setValues] = useState({ about: "" });
  const [fliedAbout, setFliedAbout] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    // ComponentDitMount & ComponentDitUpdate:
    let token = localStorage.getItem("token");

    fetch("http://localhost:5000/user/getByUser", {
      headers: {
        Authorization: "Bearer " + token,
      },
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log("getByUser :", res);
        if (res.avatar === "") {
          setAvatar("http://localhost:5000/uploads/avatarDefault.PNG");
          console.log("l'avatar par défault", res.avatar);
        } else {
          setAvatar("http://localhost:5000/uploads/" + res.avatar);
          console.log("l'avatar:", res.avatar);
        }
      });
  });

  // Les méthodes:

  const handleChangeAvatar = (event) => {
    let token = localStorage.getItem("token");

    let data = new FormData();
    data.append("avatar", event.target.files[0]);

    fetch(`http://localhost:5000/user/updateAvatar`, {
      headers: {
        Authorization: "Bearer " + token,
      },
      method: "PUT",
      body: data,
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setAvatar("http://localhost:5000/uploads/" + res);
        //  Je récupère la reponse de l'update, et comme celle-ci contient le filename
        // Je setState en concatenant l'adresse d' l'upload des images avec la réponse
      })
      .catch((error) => console.log(error));
  };

  const handleChangeProfile = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value }, console.log(name));
  };

  const subFormProfile = (event) => {
    event.preventDefault();
    let token = localStorage.getItem("token");
    const { about } = values;

    fetch(`http://localhost:5000/user/updateProfile`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
      method: "PUT",
      body: JSON.stringify({ about: about }),
    })
      .then((res) => {
        console.log(about);
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setFliedAbout(about);
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  return (
    <div className="office-profile">
      <h1 className="office-account-title">EDITION DU COMPTE</h1>

      <form className="form-avatar">
        <label>Avatar</label>
        <input
          id="avatar"
          type="file"
          name="avatar"
          onChange={handleChangeAvatar}
        />
        <div className="avatar-contain">
          <img className="avatar" src={avatar} alt="avatar" />
        </div>
      </form>

      <form className="form-profile" onSubmit={subFormProfile}>
        <input
          type="text"
          name="about"
          placeholder="About..."
          value={values.about}
          onChange={handleChangeProfile}
        />
        <span>{fliedAbout}</span>
        <button className="button-save-profile" type="submit">
          Enregistrer
        </button>
      </form>
    </div>
  );
};

OfficeProfile.propTypes = {
  profileAvatar: PropTypes.string,
  about: PropTypes.string,
};

OfficeProfile.defaultProps = {
  profileAvatar: "",
  about: "",
};

export default OfficeProfile;
