import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import UserGallery from "./UserGallery";
import ModalViewMedia from "./ModalViewMedia";
import "../../css/officeGallery.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
  addButton: {
    backgroundColor: "#F16462",
    color: "#404040",
    height: "4rem",
    borderRadius: "50%",
  },
}));

const OfficeGallery = (props) => {
  // les states & setStates:
  const classes = useStyles();
  const [gallery, setGallery] = useState([]);
  const [file, setFile] = useState("");

  const getMedia = () => {
    let token = localStorage.getItem("token");

    return fetch(`http://localhost:5000/user/getGallery`, {
      headers: {
        Authorization: "Bearer " + token,
      },
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setGallery(res);
        console.log("res.gallery:", res);
      })
      .catch((error) => console.log(error));
  };

  // ComponentDitMount, ComponentWillMount & ComponentDitUpdate:
  useEffect(() => {
    getMedia()
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setGallery(res);
        console.log("res.gallery:", res);
      })
      .catch((error) => console.log(error));
  }, []);

  // Méthodes:
  const handleChangeMedia = (event) => {
    setFile(event.target.files[0]);
  };

  const subFormMedia = (event) => {
    event.preventDefault();
    let token = localStorage.getItem("token");
    let newMedia = [...gallery];

    let data = new FormData();
    data.append("media", file);

    fetch(`http://localhost:5000/user/gallery/upload`, {
      headers: {
        Authorization: "Bearer " + token,
      },
      method: "POST",
      body: data,
    })
      .then((res) => {
        if (res.status === 200) {
          res.json().then((res) => {
            setFile(newMedia);
            console.log(res);
          });
          setFile("");
          document.getElementById("media").value = "";
        } else {
          console.log(res);
          console.log("hello");
        }
      })
      .then(() => {
        getMedia();
      })
      .catch((error) => console.log("hello error"));
  };

  return (
    <div className="office-gallery">
      <div className="gallery-container">
        <div className="user-gallery">
          {gallery.map((media, index) => {
            return <UserGallery key={index} media={media} />;
          })}
          <ModalViewMedia />
        </div>
      </div>

      <form className="form-gallery" onSubmit={subFormMedia}>
        <input
          id="add-media"
          className={classes.input}
          type="file"
          name="media"
          onChange={handleChangeMedia}
          placeholder="sélectionner une image de couverture"
        />

        <span className="button-gallery">
          <label htmlFor="add-media">
            <Button className={classes.addButton} component="span">
              <AddIcon />
            </Button>
          </label>

          <button className="save-media" type="submit">
            Save
            <SaveIcon />
          </button>
        </span>
      </form>
    </div>
  );
};

OfficeGallery.propTypes = {
  project: PropTypes.any,
};

OfficeGallery.defaultProps = {
  project: [],
};

export default OfficeGallery;
