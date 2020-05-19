import React from "react";
import Modal from "@material-ui/core/Modal";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const ModalViewMedia = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      outline: "none",
      display: "block",
      paddingRight: "16px",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
  }));

  // useSelector consiste à rappeler un state général définis dans le store
  const modalMediaBool = useSelector((state) => state.modalMediaBool);
  const media = useSelector((state) => state.media);
  console.log("media reducer: " + media._id);

  // states
  const classes = useStyles();

  // Rappel des actions Redux:
  const dispatch = useDispatch();
  console.log("modalMediaBool:", modalMediaBool);

  // Modal material-ui:
  const handleCloseMedia = () => {
    dispatch({ type: "CLOSE_MODAL_MEDIA_BOOL", media: props.media });
  };

  return (
    <Modal
      className={classes.root}
      open={modalMediaBool}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className="modal-container" onClick={handleCloseMedia}>
        <div className="modal-media">
          <img
            src={"http://localhost:5000/uploads/" + media.fileName}
            alt={"http://localhost:5000/uploads/" + media.fileName}
          />
        </div>
      </div>
    </Modal>
  );
};

ModalViewMedia.propsTypes = {
  media: PropTypes.string,
};

ModalViewMedia.defaultProps = {
  media: "",
};

export default ModalViewMedia;
