import React from 'react';



class Project extends React.Component { 
    constructor(props) {
        super(props)
    
        this.state = {
            title:"",
            description:"",
            content:"",
            display: "flex",
            message:""
        }
        this.handleChangeProject = this.handleChangeProject.bind(this);
        // this.showButtonUpdate = this.showButtonUpdate.bind(this);
    } 

    handleChangeProject(event){
        let value = event.target.value
        let name = event.target.name; 
        
        this.setState({
            [name]: value 
           
        },console.log(name))
    }; 

    render(){
        const {project} = this.props;
            
        return(
           
            <div id={project.projectId} className="projects-content">

                <h1>{project.titleProject}</h1>

                <input type="text" name="title" 
                    placeholder="title of project"
                    value={this.state.title}
                    className="project-input"
                    onChange={this.handleChangeProject}

                />
                <span>{project.description}</span>

                <input type="text" name="description" 
                    placeholder="description of project"
                    value={this.state.description}
                    className="project-input"
                    onChange={this.handleChangeProject}
                />
                <p>{project.content}</p>

                <input type="text" name="content" 
                    placeholder="content of project"
                    value={this.state.content}
                    className="project-input"
                    onChange={this.handleChangeProject}
                />

                <div className="button-container">
                    <button className="update-project" >
                        <img src="img/button-update.png" alt="button-update"/>
                        Modifier
                    </button>

                    <button className={"validate-project" }>
                        <img src="img/button-validate.png" alt="button-validate"/>
                        Actualisé
                    </button>

                    <button className="delete-project">
                        <img src="img/button-delete.png" alt="button-delete"/> 
                        Supprimer
                    </button>
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

//  const {project} = props;
// const dispatch = useDispatch(); 
// useDispatch consiste à activer les actions du reducer (liste de nos actions)
// const modalProjectBool = useSelector(state => state.modalProjectBool) 
// useSelector consiste à rappeler un state général définis dans le store
// console.log("modalProjectBool: ", modalProjectBool) 

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