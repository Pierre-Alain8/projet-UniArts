import React from 'react';


class Projects extends React.Component { 
    constructor(props) {
        super(props)
    
        this.state = {
           
        }
     
    } 

    render(){
        const {projectId, titleProject, descriptionProject, contentProject} = this.props;

        return(
            <div id={projectId} className="projects-content">
            <h1>{titleProject}</h1>
            <span>{descriptionProject}</span>
            <p>{contentProject}</p>

            <button>MODIFIER</button>
            <button>DELETE</button>
        </div>
        )
    }
}

export default Projects
