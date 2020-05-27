import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import "../../scss/articlesPost.scss";
import { Editor } from "@tinymce/tinymce-react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

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
  const [classeEdit, setClasseEdit] = useState("form-edit-container");
  const [values, setValues] = useState({ title: "", content: "" });
  const [file, setFile] = useState("");

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
      });
      setClasseEdit("form-edit-container isActive");
    } else {
      console.log("oui");
      console.log(formEditArticle);
      return null;
    }
    console.log(formEditArticle);
    console.log("target data:", targetData);
  };

  const handleEditorChange = (content, editor) => {
    setValues({ ...values, content });
    console.log("contenue article:", values);
  };

  const handleEditArticle = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value }, console.log(name));
  };

  const handleEditImage = (event) => {
    setFile(event.target.files[0]);
  };

  const updateFormArticle = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    let token = localStorage.getItem("token");

    let data = new FormData();
    data.append("image", file);
    data.append("title", values.title);
    data.append("content", values.content);

    fetch(`http://localhost:5000/user/adm/updateArticle/` + article._id, {
      headers: {
        Authorization: "Bearer " + token,
      },
      method: "PUT",
      body: data,
    })
      .then((res) => {
        console.log(
          "title:" + values.title,
          "image: " + file,
          "content: " + values.content
        );
        return res.json();
      })
      .then((res) => {
        // props.getArticles()
        console.log("response:", res);
      })
      .catch((err) => {
        console.log("requête raté:", err);
      });
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

          <Button className={classes.deleteArticle}>
            <DeleteIcon />
            supprimer
          </Button>
        </span>
      </div>

      <div id={article._id} className={classeEdit}>
        <form className="form-edit-article" onSubmit={updateFormArticle}>
          <input
            className="input-edit-title"
            type="text"
            name="title"
            value={values.title}
            placeholder="title of article"
            onChange={handleEditArticle}
          />

          <input
            style={{ display: "none" }}
            id="edit-image"
            type="file"
            name="image"
            placeholder="sélectionner une image"
            onChange={handleEditImage}
          />

          <label htmlFor="edit-image">
            <Button className="edit-image-article" component="span">
              modifier l'image
              <PhotoCamera />
            </Button>
          </label>

          <div className="editor">
            <Editor
              name="content"
              initialValue={values.content}
              apiKey="g4yqdpo1so4x0pnr2jl6g2i1zoiu3mmyyhwkr5xmbz95bm6f"
              init={{
                width: "100%",
                height: "100%",
                menubar: false,
              }}
              onEditorChange={handleEditorChange}
            />
          </div>

          <span className="buttons-edit-form">
            <Button
              className={classes.editArticle}
              type="submit"
              variant="contained"
              startIcon={<SaveIcon />}
            >
              modifier
            </Button>
          </span>
        </form>
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
