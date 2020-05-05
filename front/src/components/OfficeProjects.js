import React, {useState, useEffect} from 'react';
import Project from './Project';


const OfficeProjects = (props) =>{
        // les states & setStates:
        const [projects, setProjects] = useState([])
        const [message, setMessage] = useState("")
        const [file, setFile] = useState("")
        const [values, setValues] = useState({title: "", description: "", content: ""})
    
        // ComponentDitMount, ComponentWillMount & ComponentDitUpdate:
        useEffect(() => {
            let token = localStorage.getItem('token');
    
            fetch(`http://localhost:5000/user/getAllProjects`,{
                headers:{
                    "Authorization": "Bearer " + token
                },
                method: 'GET',
            })
            .then((res) =>{
                return res.json()
            })
            .then((res) =>{
                setProjects(res.projectId)
                
                console.log("getAllProjects: ",res);
                console.log("projects: ",res.projectId);
                console.log("cover: ", res.cover)
               
            })
            .catch(error => console.log(error))
        }, [])
    
    
        const handleChangeCover = (event) =>{
            setFile(event.target.files[0])
        }
    
        const handleChangeProject = (event) =>{
            const {name, value} = event.target
            setValues({...values, [name]: value}, console.log(name))
        }
    
        const subformProject = (event) =>{
            event.preventDefault();
            let token = localStorage.getItem('token');
            let newProjects = [...projects, values]
            
            let data = new FormData()
            data.append("cover", file)
            data.append("title", values.title)
            data.append("description", values.description)
            data.append("content", values.content)
            
    
            fetch(`http://localhost:5000/user/addProject`, {
                headers:{
                    "Authorization": "Bearer " + token,
                },
                method: 'POST',
                body: data,
            })
            .then((res) =>{
                if(res.status === 200){
                    res.json().then( (res) => {
                        setMessage("votre projet a été enregistré avec succès !")
                        setProjects(newProjects)
                        console.log(res)
                    })
                }else{
                    console.log(res)
                    console.log("hello")
                }
            })
        }
    
        return(
            <section className="office-projects tab-content"> 
                <form className="form-projects" onSubmit={subformProject}>
                    <input type="text" name="title" 
                        onChange={handleChangeProject}
                        value={values.title} 
                        placeholder="title of project"
                        className="project-input"
                    />

                    <input id="cover" type="file" name="cover" onChange={handleChangeCover}  />
            
                    <input type="text" name="description" 
                        onChange={handleChangeProject} 
                        value={values.description } 
                        placeholder="description of project" 
                        className="project-input"
                    />

                    <input type="text" name="content" 
                        onChange={handleChangeProject} 
                        value={values.content}
                        placeholder="content of project" 
                        className="project-input"
                    />
            
                    <button type="submit">Enregistrer</button> 
                    <p>{message}</p>
                </form> 
            
                <div className="list-projects">
                    {
                        projects.map((project, index)=>{
                            return(
                                <Project key={index} project={project}/>
                            )
                        })
                    }
                </div>
            
            </section>
        )
    }


export default OfficeProjects