import React, { useState, useEffect } from "react";
import ArticlesPost from "./ArticlesPost";
import FormEditArticle from "./FormEditArticle";
import DeleteModalArticle from "./DeleteModalArticle";
import CKEditor from "ckeditor4-react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import "../../scss/officeArticle.scss";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

const useStyles = makeStyles((theme) => ({
  saveArticle: {
    backgroundColor: "rgb(64, 64, 64)",
    color: "rgb(255, 255, 255)",
    marginTop: "0.8rem;",
  },

  cancelArticle: {
    backgroundColor: "rgb(64, 64, 64)",
    color: "rgb(255, 255, 255)",
    marginTop: "0.8rem;",
  },

  editor: {
    height: "100%",
    width: "100%",
  },
}));

const FormAddArticle = (props) => {
  // states
  const classes = useStyles();

  const [values, setValues] = useState({ title: "", content: "" });
  const [file, setFile] = useState("");
  const [articles, setArticles] = useState([]);

  const getArticles = () => {
    return fetch(`http://localhost:5000/user/adm/getAllArticles`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setArticles(res);

        console.log("getAllArticles ", res);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getArticles()
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setArticles(res);

        console.log("getAllArticles ", res);
      })
      .catch((error) => console.log(error));
  }, []);

  // useSelector consiste à rappeler un state général définis dans le store
  const formArticleBool = useSelector((state) => state.formArticleBool);
  const formActive = useSelector((state) => state.formActive);

  // Rappel des actions Redux:
  const dispatch = useDispatch();

  // Méthodes
  const cancelNewArticle = (event) => {
    event.preventDefault();
    dispatch({ type: "CANCEL_FORM_ARTICLE_BOOL", form: props.form });
  };

  const handleChangeArticle = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value }, console.log("title:", values));
  };

  const handleCekditorState = (event) => {
    console.log(event.editor.getData());
    const data = event.editor.getData();
    setValues({ ...values, content: data });
    console.log("data:", data);
  };
  const handleChangeImage = (event) => {
    setFile(event.target.files[0]);
  };

  const subFormArticle = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    let token = localStorage.getItem("token");
    let newArticle = [...articles, values];

    let data = new FormData();
    data.append("image", file);
    data.append("title", values.title);
    data.append("content", values.content);

    fetch(`http://localhost:5000/user/adm//addArticle`, {
      headers: {
        Authorization: "Bearer " + token,
      },
      method: "POST",
      body: data,
    })
      .then((res) => {
        if (res.status === 200) {
          res.json().then((res) => {
            setArticles(newArticle);
            console.log(res);
          });
        } else {
          console.log(res);
          console.log("hello");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="form-container">
        <form
          className={formArticleBool === true ? formActive : "form-article"}
          onSubmit={subFormArticle}
        >
          <input
            className="input-title"
            type="text"
            name="title"
            value={values.title}
            onChange={handleChangeArticle}
            placeholder="title of article"
          />

          <input
            style={{ display: "none" }}
            id="add-image"
            type="file"
            name="image"
            placeholder="sélectionner une image"
            onChange={handleChangeImage}
          />

          <label htmlFor="add-image">
            <Button className="add-image-article" component="span">
              ajouter une image
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

          <span className="buttons-form">
            <Button
              className={classes.saveArticle}
              type="submit"
              variant="contained"
              startIcon={<SaveIcon />}
            >
              enregistrer
            </Button>
            <Button
              className={classes.cancelArticle}
              startIcon={<CancelIcon />}
              onClick={cancelNewArticle}
            >
              Annuler
            </Button>
          </span>
        </form>
      </div>
      <div className="list-article">
        <div className="list-article-title">
          <h2>Articles publiés</h2>
        </div>

        {articles &&
          articles.map((article, index) => {
            return <ArticlesPost key={index} article={article} />;
          })}
        <FormEditArticle />
        <DeleteModalArticle getArticles={getArticles} />
      </div>
    </>
  );
};

FormAddArticle.propTypes = {
  article: PropTypes.array,
};

FormAddArticle.defaultProps = {
  article: [],
};

export default FormAddArticle;
