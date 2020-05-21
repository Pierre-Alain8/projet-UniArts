import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Project from "./Project";
import ModalEditProject from "./ModalEditProject";
import DeleteModalProject from "./DeleteModalProject";
import "../../css/officeProjects.css";

const OfficeProjects = (props) => {
  // les states & setStates:
  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState("");
  const [values, setValues] = useState({
    title: "",
    description: "",
    content: "",
  });

  const getProjects = () => {
    let token = localStorage.getItem("token");

    return fetch(`http://localhost:5000/user/getAllProjects`, {
      headers: {
        Authorization: "Bearer " + token,
      },
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setProjects(res.projectId);

        console.log("getAllProjects: ", res);
        console.log("projects: ", res.projectId);
        console.log("cover: ", res.cover);
      })
      .catch((error) => console.log(error));
  };

  // ComponentDitMount, ComponentWillMount & ComponentDitUpdate:
  useEffect(() => {
    getProjects()
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setProjects(res.projectId);

        console.log("getAllProjects: ", res);
        console.log("projects: ", res.projectId);
        console.log("cover: ", res.cover);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChangeCover = (event) => {
    setFile(event.target.files[0]);
  };

  const handleChangeProject = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value }, console.log(name));
  };

  const subformProject = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    let token = localStorage.getItem("token");
    let newProjects = [...projects, values];

    let data = new FormData();
    data.append("cover", file);
    data.append("title", values.title);
    data.append("description", values.description);
    data.append("content", values.content);

    fetch(`http://localhost:5000/user/addProject`, {
      headers: {
        Authorization: "Bearer " + token,
      },
      method: "POST",
      body: data,
    })
      .then((res) => {
        if (res.status === 200) {
          res.json().then((res) => {
            setMessage("votre projet a été enregistré avec succès !");
            setProjects(newProjects);
            console.log(res);
          });
          setValues({ title: "", description: "", content: "" });
          setFile("");
          document.getElementById("cover").value = "";
        } else {
          console.log(res);
          console.log("hello");
        }
      })
      .then(() => {
        getProjects();
      });
  };

  return (
    <div className="office-projects">
      <h1 className="office-project-title">AJOUTER UN NOUVEAU PROJET</h1>
      <form className="form-projects" onSubmit={subformProject}>
        <input
          type="text"
          name="title"
          onChange={handleChangeProject}
          value={values.title}
          placeholder="title of project"
          className="project-input"
        />

        <input
          id="cover"
          type="file"
          name="cover"
          onChange={handleChangeCover}
          placeholder="sélectionner une image de couverture"
        />

        <input
          type="text"
          name="description"
          onChange={handleChangeProject}
          value={values.description}
          placeholder="description of project"
          className="project-input"
        />

        <input
          type="text"
          name="content"
          onChange={handleChangeProject}
          value={values.content}
          placeholder="content of project"
          className="project-input"
        />

        <button className="button-save-project" type="submit">
          Enregistrer
        </button>
        <span>{message}</span>
      </form>

      <div className="list-projects">
        {projects.map((project, index) => {
          return <Project key={index} project={project} />;
        })}
        <ModalEditProject getProjects={getProjects} />
        <DeleteModalProject getProjects={getProjects} />
      </div>
    </div>
  );
};

OfficeProjects.propTypes = {
  project: PropTypes.array,
};

OfficeProjects.defaultProps = {
  project: [],
};

export default OfficeProjects;
