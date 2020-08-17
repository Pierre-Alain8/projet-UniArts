import React from "react";
// import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const DeleteModalArticle = (props) => {
  // state

  // useSelector consiste à rappeler un state général définis dans le store
  const modalDeleteArticle = useSelector((state) => state.modalDeleteArticle);
  const article = useSelector((state) => state.article);

  // Rappel des actions Redux:
  const dispatch = useDispatch();

  // Les méthodes:

  const deleteArticle = () => {
    let token = localStorage.getItem("token");

    fetch(`http://localhost:5000/user/adm/deleteArticle/` + article._id, {
      headers: {
        Authorization: "Bearer " + token,
      },
      method: "DELETE",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        props.getArticles();
        dispatch({ type: "CLOSE_MODAL_DELETE_ARTICLE" });
        console.log("removed success: ", res);
      });
  };

  const closeModalDeleteArticle = () => {
    dispatch({ type: "CLOSE_MODAL_DELETE_ARTICLE" });
  };

  // Modal material-ui:
  return (
    <div>
      <Dialog
        open={modalDeleteArticle}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Suppression de l'article"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ête-vous sûr de vouloir suprimmer votre article ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            className="delete-close-modal"
            onClick={deleteArticle}
            color="primary"
          >
            Oui
          </button>
          <button
            className="delete-close-modal"
            onClick={closeModalDeleteArticle}
            color="primary"
            autoFocus
          >
            Non
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteModalArticle;
