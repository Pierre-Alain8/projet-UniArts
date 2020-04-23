import React from 'react';


class Project extends React.Component { 
    constructor(props) {
        super(props)
    
        this.state = {
           
        }
     
    } 

    render(){
        const {project} = this.props;

            
        return(
           
            <div id={project.projectId} className="projects-content">
                <h1>{project.titleProject}</h1>
                <span>{project.description}</span>
                <p>{project.content}</p>

                <div className="button-container">
                    <button className="update-project">MODIFIER</button>
                    <button className="delete-project">DELETE</button>
                </div>
            </div>

           
            
        )
    }
}

export default Project

// Les hooks : 
// const Project = (props) =>{
//     const {project} = props;
//     const [deleteLoading, setDeleteLoading] = useState(false);
//     // Ce sont les useState qui remplace le this.state et le This.setSate
//     // Mettre des noms de méthode  parlant
//     const deleteProject = () =>{ // ce sont les méthodes
//         setDeleteLoading(true)
        
//     }
//     return(
       
//         <div id={project.projectId} className="projects-content">
//             {console.log(deleteLoading)}
//             <h1>{project.titleProject}</h1>
//             <span>{project.description}</span>
//             <p>{project.content}</p>

//             <button className="update-project">MODIFIER</button>
//             <button onClick={deleteProject} className="delete-project">DELETE</button>
//         </div>
    
// )
// }