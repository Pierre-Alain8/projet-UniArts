import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import ModalEditProject from './ModalEditProject';

const Project = (props) =>{
    
    const {project} = props;
    // Ce sont les useState qui remplace le this.state et le This.setSate
    
    const dispatch = useDispatch(); //  useDispatch consiste à activer les actions du reducer (liste de nos actions)
   
    // Les méthodes
    // Modal material-ui:
    const handleOpen = () => {
        // Dans le dispatch on spécifie l'action et lui passe les paramètres du projets
        dispatch({type: 'OPEN_MODAL_PROJECT_BOOL', project: props.project})
        
    }; 

    // méthode project
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
        <div className="projects-container">
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

           <ModalEditProject  />

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