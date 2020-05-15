import React, { useState } from "react";

const UserGallery = (props) => {
  // les states & setStates:
  const [gallery, setGallery] = useState([]);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState("");

  // const getProjects = () => {
  //     let token = localStorage.getItem('token');

  //     return fetch(`http://localhost:5000/user/getAllProjects`,{
  //         headers:{
  //             "Authorization": "Bearer " + token
  //         },
  //         method: 'GET',
  //     })
  //     .then((res) =>{
  //         return res.json()
  //     })
  //     .then((res) =>{
  //         setProjects(res.projectId)

  //         console.log("getAllProjects: ",res);
  //         console.log("projects: ",res.projectId);
  //         console.log("cover: ", res.cover)

  //     })
  //    .catch(error => console.log(error))
  // }

  // // ComponentDitMount, ComponentWillMount & ComponentDitUpdate:
  // useEffect(() => {

  //     getProjects()
  //     .then((res) =>{
  //         return res.json()
  //     })
  //     .then((res) =>{
  //         setProjects(res.projectId)

  //         console.log("getAllProjects: ",res);
  //         console.log("projects: ",res.projectId);
  //         console.log("cover: ", res.cover)

  //     })
  //     .catch(error => console.log(error))
  // }, [])

  const handleChangeMedia = (event) => {
    setFile(event.target.files[0]);
  };

  const subFormMedia = (event) => {
    event.preventDefault();
    let token = localStorage.getItem("token");
    let newMedia = [...gallery];

    let data = new FormData();
    data.append("media", file);

    fetch(`http://localhost:5000/user/gallery/upload`, {
      headers: {
        Authorization: "Bearer " + token,
      },
      method: "POST",
      body: data,
    })
      .then((res) => {
        if (res.status === 200) {
          res.json().then((res) => {
            setMessage("votre image a bien été ajoutée");
            setFile(newMedia);
            console.log(res);
          });
          setFile("");
          document.getElementById("media").value = "";
        } else {
          console.log(res);
          console.log("hello");
        }
      })
      .then(() => {
        console.log("hello");
      });
  };

  return (
    <div className="office-gallery-contenair">
      <div className="form-gallery" onSubmit={subFormMedia}>
        <input
          id="media"
          type="file"
          name="media"
          onChange={handleChangeMedia}
          placeholder="sélectionner une image de couverture"
        />
      </div>
    </div>
  );
};

export default UserGallery;
