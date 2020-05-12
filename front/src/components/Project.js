import React from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';

const Project = (props) =>{
    
    // props:
    const {project} = props;
    
    const dispatch = useDispatch(); // useDispatch consiste à activer les actions du reducer (liste de nos actions)
   
    // Les méthodes:
    const handleOpenProject = () => {
        // Dans le dispatch on spécifie l'action et lui passe les paramètres du projets
        dispatch({type: 'OPEN_MODAL_PROJECT_BOOL', project: props.project})
        
    }; 

    const handleOpenDelete = () => {
        dispatch({type: 'OPEN_MODAL_DELETE_PROJECT', project: props.project})
    }
   

    return(  
        <div className="projects-container">
            <div className="modal-button">
                <h1>{project.title}</h1>
                <img src={"http://localhost:5000/uploads/" + project.cover} alt="project" />

                <button className="update-project" onClick={handleOpenProject} >
                    <img src="img/button-update.png" alt="button-update"/>
                     Modifier
                </button>

                <button className="delete-project" onClick={handleOpenDelete}>
                    <img src="img/button-delete.png" alt="button-delete"/> 
                    Supprimer
                </button>
            </div>
        </div>

)
}
Project.propTypes = {
    project: PropTypes.object
};
Project.defaultProps = {
    project: {}
};

export default Project
