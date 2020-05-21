import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

const UserGallery = (props) => {
  const { media } = props;

  const dispatch = useDispatch(); // useDispatch consiste à activer les actions du reducer (liste de nos actions)

  // Les méthodes:
  const handleOpenMedia = () => {
    // Dans le dispatch on spécifie l'action et lui passe les paramètres du projets
    dispatch({ type: "OPEN_MODAL_MEDIA_BOOL", media: props.media });
  };

  return (
    <div className="media-contenair" onClick={handleOpenMedia}>
      <img
        src={"http://localhost:5000/uploads/" + media.fileName}
        alt={media.fileName}
      />
    </div>
  );
};

UserGallery.propTypes = {
  media: PropTypes.object,
};
UserGallery.defaultProps = {
  media: {},
};

export default UserGallery;
