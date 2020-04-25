import React, {useState} from 'react';

const Project = (props) =>{
    const {project} = props;
    // Ce sont les useState qui remplace le this.state et le This.setSate
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [values, setValues] = useState({title: "", description: "", content: ""}) ;
   
    // Les méthodes

    const deleteProject = () =>{ // ce sont les méthodes
        setDeleteLoading(true)
        console.log(deleteLoading)
                
    }
    const handleChangeProject = (event) =>{
        const {name, value} = event.target // création de l'event 
        setValues({...values, [name]: value}) // setState de values en créant une nouvelle entrée dans ls state values  cibler les valeurs des inputs possédant l'attribut name

    }

// const dispatch = useDispatch(); //  useDispatch consiste à activer les actions du reducer (liste de nos actions)
// const modalProjectBool = useSelector(state => state.modalProjectBool) // useSelector consiste à rappeler un state général définis dans le store
// console.log("modalProjectBool: ", modalProjectBool) 

    return(
       
        <div id={project.projectId} className="projects-content">
        

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

        <div className="button-container">
            <button className="update-project" >
                <img src="img/button-update.png" alt="button-update"/>
                Modifier
            </button>

            <button className={"validate-project" }>
                <img src="img/button-validate.png" alt="button-validate"/>
                Actualisé
            </button>

            <button onClick={deleteProject} className="delete-project">
                <img src="img/button-delete.png" alt="button-delete"/> 
                Supprimer
            </button>
        </div>
    </div>

)
}


export default Project