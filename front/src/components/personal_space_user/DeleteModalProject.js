import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const DeleteModalProject = (props) => {
  // state

  // useSelector consiste à rappeler un state général définis dans le store
  const modalDeletePoject = useSelector((state) => state.modalDeletePoject);
  const project = useSelector((state) => state.project);
  console.log("delete modal project.id: ", project._id);

  // Rappel des actions Redux:
  const dispatch = useDispatch();
  console.log("modalDeletePoject:", modalDeletePoject);

  // Les méthodes:
  const closeModalDelete = () => {
    dispatch({ type: "CLOSE_MODAL_DELETE_PROJECT" });
  };

  const deleteProject = () => {
    let token = localStorage.getItem("token");

    fetch(`http://localhost:5000/user/deleteProject/` + project._id, {
      headers: {
        Authorization: "Bearer " + token,
      },
      method: "DELETE",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        props.getProjects();
        dispatch({ type: "CLOSE_MODAL_DELETE_PROJECT" });
        console.log("removed success: ", res);
      });
  };

  // Modal material-ui:
  return (
    <div>
      <Dialog
        open={modalDeletePoject}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Suppression du projet"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ête-vous sûr de vouloir suprimmer votre projet ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            className="delete-close-modal"
            onClick={deleteProject}
            color="primary"
          >
            Oui
          </button>
          <button
            className="delete-close-modal"
            onClick={closeModalDelete}
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

DeleteModalProject.propsTypes = {
  getProjects: PropTypes.func,
};

DeleteModalProject.defaultProps = {
  getProjects: () => {},
};
export default DeleteModalProject;
