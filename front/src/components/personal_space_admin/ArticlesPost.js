import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import "../../scss/articlesPost.scss";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";

import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  editArticle: {
    color: "rgb(64, 64, 64)",
    border: "1px solid rgb(64, 64, 64)",
  },
  deleteArticle: {
    color: "rgb(241, 100, 98)",
    border: "1px solid rgb(241, 100, 98)",
  },
}));

const ArticlesPost = (props) => {
  const { article } = props;

  // states
  const classes = useStyles();
  // const [classeEdit, setClasseEdit] = useState("form-edit-container");

  // useSelector consiste à rappeler un state général définis dans le store
  const formEditArticle = useSelector((state) => state.formEditArticle);

  // Rappel des actions Redux:
  const dispatch = useDispatch();

  // useSelector consiste à rappeler un state général définis dans le store
  console.log("article " + article);

  // Méthodes

  const showEditArticle = (event) => {
    // const articleId = document.getElementById("article._id");
    const targetData = event.currentTarget.id;

    if (targetData === article._id) {
      dispatch({
        type: "SHOW_FORM_EDIT_ARTICLE",
        article: props.article,
      });
      // setClasseEdit("form-edit-container isActive");
    } else {
      console.log("oui");
      console.log(formEditArticle);
      return null;
    }
    console.log(formEditArticle);
    console.log("target data:", targetData);
  };

  const handleOpenDeleteArticle = () => {
    dispatch({ type: "OPEN_MODAL_DELETE_ARTICLE", article: props.article });
  };

  return (
    <div className="edit-container">
      <div className="article">
        {/* <div className="preview-img-article">
          <img
            src={"http://localhost:5000/uploads/" + article.image}
            alt="article cover"
          />
        </div> */}
        <h3 className="title-article">{article.title}</h3>
        <span className="buttons-articles">
          <Button
            className={classes.editArticle}
            id={article._id}
            data-id={article._id}
            onClick={showEditArticle}
          >
            <EditIcon />
            edit
          </Button>

          <Button
            className={classes.deleteArticle}
            onClick={handleOpenDeleteArticle}
          >
            <DeleteIcon />
            supprimer
          </Button>
        </span>
      </div>
    </div>
  );
};

ArticlesPost.propTypes = {
  article: PropTypes.object,
};
ArticlesPost.defaultProps = {
  article: {},
};

export default ArticlesPost;
