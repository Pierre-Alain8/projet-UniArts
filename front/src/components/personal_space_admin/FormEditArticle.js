import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import "../../scss/articlesPost.scss";
import CKEditor from "ckeditor4-react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
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
  modal: {
    borderRadius: "1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const FormEditArticle = (props) => {
  const { article } = props;

  // states
  const classes = useStyles();
  //   const [classeEdit, setClasseEdit] = useState("form-edit-container");
  const [values, setValues] = useState({ title: "", content: "" });
  const [file, setFile] = useState("");

  // useSelector consiste à rappeler un state général définis dans le store
  const formEditArticle = useSelector((state) => state.formEditArticle);
  const articleEdit = useSelector((state) => state.article);
  console.log("article à éditer:", articleEdit);

  // Rappel des actions Redux:
  const dispatch = useDispatch();

  // Méthodes

  const handleCloseArticle = () => {
    dispatch({ type: "CLOSE_FORM_EDIT_ARTICLE" });
  };

  const handleEditArticle = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value }, console.log(name));
  };

  const handleCekditorState = (event) => {
    console.log(event.editor.getData());
    const data = event.editor.getData();
    setValues({ ...values, content: data });
    console.log("data:", data);
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

    fetch(`http://localhost:5000/user/adm/updateArticle/` + articleEdit._id, {
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
    <Modal
      className={classes.modal}
      open={formEditArticle}
      onClose={handleCloseArticle}
    >
      <div className="form-edit-container" id={article._id}>
        {/* className={classeEdit} */}
        <form className="form-edit-article" onSubmit={updateFormArticle}>
          <input
            className="input-edit-title"
            type="text"
            name="title"
            defaultValue={articleEdit.title}
            // value={articleEdit.title}
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

          <div className={classes.editor}>
            <CKEditor
              data="<p>Entrez du texte!</p>"
              onChange={handleCekditorState}
              config={{
                toolbar: [
                  {
                    name: "document",
                    items: [
                      "Source",
                      "-",
                      "Save",
                      "NewPage",
                      "Preview",
                      "Print",
                      "-",
                      "Templates",
                    ],
                  },
                  {
                    name: "clipboard",
                    items: [
                      "Cut",
                      "Copy",
                      "Paste",
                      "PasteText",
                      "PasteFromWord",
                      "-",
                      "Undo",
                      "Redo",
                    ],
                  },
                  {
                    name: "editing",
                    items: ["Find", "Replace", "-", "SelectAll", "-", "Scayt"],
                  },
                  {
                    name: "forms",
                    items: [
                      "TextField",
                      "Textarea",
                      "Select",
                      "Button",
                      "ImageButton",
                      "HiddenField",
                    ],
                  },
                  "/",
                  {
                    name: "basicstyles",
                    items: [
                      "Bold",
                      "Italic",
                      "Underline",
                      "Strike",
                      "Subscript",
                      "Superscript",
                      "-",
                      "CopyFormatting",
                      "RemoveFormat",
                    ],
                  },
                  {
                    name: "paragraph",
                    items: [
                      "NumberedList",
                      "BulletedList",
                      "-",
                      "Outdent",
                      "Indent",
                      "-",
                      "Blockquote",
                      "CreateDiv",
                      "-",
                      "JustifyLeft",
                      "JustifyCenter",
                      "JustifyRight",
                      "JustifyBlock",
                      "-",
                      "BidiLtr",
                      "BidiRtl",
                      "Language",
                    ],
                  },
                  { name: "links", items: ["Link", "Unlink", "Anchor"] },
                  {
                    name: "insert",
                    items: [
                      "Image",
                      "Flash",
                      "SpecialChar",
                      "PageBreak",
                      "Iframe",
                    ],
                  },
                  "/",
                  {
                    name: "styles",
                    items: ["Styles", "Format", "Font", "FontSize"],
                  },
                  { name: "colors", items: ["TextColor", "BGColor"] },
                  { name: "tools", items: ["Maximize", "ShowBlocks"] },
                ],
              }}
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
    </Modal>
  );
};

FormEditArticle.propTypes = {
  article: PropTypes.object,
};
FormEditArticle.defaultProps = {
  article: {},
};

export default FormEditArticle;
