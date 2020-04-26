import React, {useState} from 'react';
import Modal from '@material-ui/core/Modal';

const Project = (props) =>{
    
    const {project} = props;
    // Ce sont les useState qui remplace le this.state et le This.setSate
    const [values, setValues] = useState({title: "", description: "", content: ""});
    const [file, setFile] = useState("")
   
    // Les méthodes
    // Modal:
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeCover = (event) =>{
        setFile(event.target.files[0])
    }

    const handleChangeProject = (event) =>{
        const {name, value} = event.target // création de l'event 
        setValues({...values, [name]: value}) // setState de values en créant une nouvelle entrée dans ls state values  cibler les valeurs des inputs possédant l'attribut name
        
    }

    const subUpdateProject = (event) =>{
        event.preventDefault();
        let token = localStorage.getItem('token');
      
        
        let data = new FormData()
        data.append("cover", file)
        data.append("title", values.title)
        data.append("description", values.description)
        data.append("content", values.content)
        
        

        fetch(`http://localhost:5000/user/updateProject/` + project._id, {
            headers:{
                "Authorization": "Bearer " + token,
            },
            method: 'PUT',
            body: data,
        })
        
        .then((res) =>{
            console.log("title:" + values.title, 
            "description: " +values.description, 
            "content: " + values.content)
            return res.json()
        })
        .then((res) =>{
            console.log("response:", res)
        })
    }

    const deleteProject = (event) => {
        let token = localStorage.getItem('token');

        fetch(`http://localhost:5000/user/deleteProject/` + project._id, {
            headers:{
                "Authorization": "Bearer " + token,
            },
            method: 'DELETE',
        })
        .then((res) =>{
            return res.json()
        })
        .then((res) =>{
            console.log('removed success: ', res)
        })
    }

  



    return(  
        <div className="projects">
            <div className="modal-button">
                <h1>{project.title}</h1>
                <img src={"http://localhost:5000/uploads/" + project.cover} alt="project" />

                <button className="update-project" onClick={handleOpen} >
                    <img src="img/button-update.png" alt="button-update"/>
                     Modifier
                </button>

                <button className="delete-project" onClick={deleteProject}>
                    <img src="img/button-delete.png" alt="button-delete"/> 
                    Supprimer
                </button>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >   
               
                <div data-id={project._id} id={project._id} className="projects-modal">
                    <div className="cover-contain">
                        <img className="cover" src={"http://localhost:5000/uploads/" + project.cover} alt="cover" />
                    </div> 

                    <form onSubmit={subUpdateProject} className="projects-content">
                        <input id="cover" type="file" name="cover" onChange={handleChangeCover}  />

                            <h1>{project.title}</h1>

                            <input type="text" name="title" 
                                placeholder="title of project"
                                value={values.title}
                                className="project-input"
                                onChange={handleChangeProject} 

                            />
                            <span>{project.description}</span>

                            <input type="text" name="description" 
                                placeholder="description of project"
                                value={values.description}
                                className="project-input"
                                onChange={handleChangeProject} 
                            />
                            <p>{project.content}</p>

                            <input type="text" name="content" 
                                placeholder="content of project"
                                value={values.content}
                                className="project-input"
                                onChange={handleChangeProject} 
                            />

                            <button  type="submit" className={"validate-project" }>
                                <img src="img/button-validate.png" alt="button-validate"/>
                                Actualisé
                            </button>

                    </form>

                </div>
                    
            </Modal>
        </div>

        
   

)
}


export default Project

// const dispatch = useDispatch(); //  useDispatch consiste à activer les actions du reducer (liste de nos actions)
// const modalProjectBool = useSelector(state => state.modalProjectBool) // useSelector consiste à rappeler un state général définis dans le store
// console.log("modalProjectBool: ", modalProjectBool) 

 /* <div className="button-container">
                            <button className="update-project" >
                                <img src="img/button-update.png" alt="button-update"/>
                                Modifier
                            </button>

                            <button  type="submit" className={"validate-project" }>
                                <img src="img/button-validate.png" alt="button-validate"/>
                                Actualisé
                            </button>

                            <button type="submit" className="delete-project">
                                <img src="img/button-delete.png" alt="button-delete"/> 
                                Supprimer
                            </button>
                        </div> */