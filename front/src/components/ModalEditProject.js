import React, {useState} from 'react';
import Modal from '@material-ui/core/Modal';
import {useSelector, useDispatch} from 'react-redux';

const ModalEditProject = (props) =>{

    
    
    // Ce sont les useState qui remplace le this.state et le This.setSate
    const [values, setValues] = useState({title: "", description: "", content: ""});
    const [file, setFile] = useState("");

     // useSelector consiste à rappeler un state général définis dans le store
    const modalProjectBool = useSelector(state => state.modalProjectBool)
    const project = useSelector(state => state.project)
    console.log("project reducer: " + project)

    // Rappel des actions Redux:
    const dispatch = useDispatch()
    console.log("modalProjectBool:", modalProjectBool) 

    // Les méthodes:
    const handleChangeCover = (event) =>{
        setFile(event.target.files[0])
    }
    
    // Modal material-ui:
    const closeModal = () => {
        dispatch({type: 'CLOSE_MODAL_PROJECT_BOOL'})
    }

    const handleChangeProject = (event) => {
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
            console.log("response:", res.projectId)
        })
    }


    return(
        <Modal
            open={modalProjectBool}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >   
       
        <div data-id={project._id} id={project._id} className="projects-modal">
            <div className="cover-contain">
                <img className="cover" src={"http://localhost:5000/uploads/" + project.cover} alt="cover" />
        </div> 

        
        <button onClick={closeModal} className="close-modal-project" >
            <img src="img/button-close.png" alt="close modal" />
        </button>
 

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
    )
}

export default ModalEditProject;