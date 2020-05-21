import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const Project = (props) => {
  // props:
  const { project } = props;

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      justifyContent: "center",
      alignContent: "space-between",
      width: "23rem",
      height: "15rem",
      "& > *": {
        margin: theme.spacing(2),
        width: theme.spacing(16),
        height: theme.spacing(16),
      },
    },

    papersStyle: {
      width: "100%",
      height: "90%",
    },
  }));
  const classes = useStyles();

  const dispatch = useDispatch(); // useDispatch consiste à activer les actions du reducer (liste de nos actions)

  // Les méthodes:
  const handleOpenProject = () => {
    // Dans le dispatch on spécifie l'action et lui passe les paramètres du projets
    dispatch({ type: "OPEN_MODAL_PROJECT_BOOL", project: props.project });
  };

  const handleOpenDelete = () => {
    dispatch({ type: "OPEN_MODAL_DELETE_PROJECT", project: props.project });
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.papersStyle} elevation={3}>
        <div className="modal-button">
          <h1>{project.title}</h1>
          <img
            src={"http://localhost:5000/uploads/" + project.cover}
            alt="project"
          />

          <button className="update-project" onClick={handleOpenProject}>
            <EditIcon />
            Modifier
          </button>

          <button className="delete-project" onClick={handleOpenDelete}>
            <DeleteIcon />
            Supprimer
          </button>
        </div>
      </Paper>
    </div>
  );
};
Project.propTypes = {
  project: PropTypes.object,
};
Project.defaultProps = {
  project: {},
};

export default Project;
