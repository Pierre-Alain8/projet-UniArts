import React from 'react';
import Project from './Project';


class OfficeProjects extends React.Component { 
    constructor(props) {
        super(props)
    
        this.state = {
            title:"",
            description:"",
            content:"",
            projects:[],
            message:""
           
        }
        this.handleChange = this.handleChange.bind(this);
        this.subformProject = this.subformProject.bind(this);
     
    } 

    componentDidMount(){
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
            this.setState({
                projects: res.projectId
            })
            console.log("getAllProjects: ",res);
            console.log("projects: ",res.projectId);
           
        })
        .catch(error => console.log(error))
    }

    handleChange(event){
        let value = event.target.value
        let name = event.target.name; 
        
        this.setState({
            [name]: value 
           
        },console.log(name))
    }; 

    subformProject(event){
        event.preventDefault();
        let token = localStorage.getItem('token');
        const newProject = {
                title: this.state.title, 
                description: this.state.description,
                content: this.state.content
            };
        let projects = [...this.state.projects, newProject]
        

        fetch(`http://localhost:5000/user/addProject`, {
            headers:{
                "Authorization": "Bearer " + token,
                'Content-Type': 'application/json'  
            },
            method: 'POST',
            body: JSON.stringify(this.state),
        })
        .then((res) =>{
            if(res.status === 200){
                res.json().then( (res) => {
                    this.setState({
                        message:"votre " + this.state.title +" a été enregistré avec succès !",
                        projects
                    })
                    console.log(res)
                })
            }else{
                console.log("hello")
            }
        })
    }

    
    render(){
        return(
            <section className="office-projects tab-content"> 
                <form className="form-projects" onSubmit={this.subformProject}>
                    <input type="text" name="title" 
                        onChange={this.handleChange}
                        value={this.state.title } 
                        placeholder="title of project"
                        className="project-input"
                    />

                    <input type="text" name="description" 
                        onChange={this.handleChange} 
                        value={this.state.description } 
                        placeholder="description of project" 
                        className="project-input"
                    />
                    <input type="text" name="content" 
                        onChange={this.handleChange} 
                        value={this.state.content }
                        placeholder="content of project" 
                        className="project-input"
                    />

                    <button type="submit">Enregistrer</button> 
                    <p>{this.state.message}</p>
                </form> 

                <div className="list-projects">
                    {
                        this.state.projects.map(project =>{
                            return(
                                <Project key={project._id} project={project}/>
                            )
                        })
                    }
                </div>

            </section>
        )
    }
}

export default OfficeProjects


// Les hooks : 
// const OfficeProjects = (props) =>{
//     const [projects, setProjects] = useState([])
//     const [message, setMessage] = useState("")
//     const [values, setValues] = useState({title: "", description: "", content: ""})


//     useEffect(() => {
//         let token = localStorage.getItem('token');

//         fetch(`http://localhost:5000/user/getAllProjects`,{
//             headers:{
//                 "Authorization": "Bearer " + token
//             },
//             method: 'GET',
//         })
//         .then((res) =>{
//             return res.json()
//         })
//         .then((res) =>{
//             // this.setState({
//             //     projects: res.projectId
//             // })
//             setProjects(res.projectId)
            
//             console.log("getAllProjects: ",res);
//             console.log("projects: ",res.projectId);
           
//         })
//         .catch(error => console.log(error))
//     }, [])



//     const handleChangeProject = (event) =>{
//         const {name, value} = event.target
//         setValues({...values, [name]: value})

//     }

//     const subformProject = (event) =>{
//         event.preventDefault();
//         let token = localStorage.getItem('token');
//         // const newProject = {
//         //         id: "ProjectId", 
//         //         title, 
//         //          description,
//         //         content
//         //     };

//         let newProjects = [...projects, values]
        

//         fetch(`http://localhost:5000/user/addProject`, {
//             headers:{
//                 "Authorization": "Bearer " + token,
//                 'Content-Type': 'application/json'  
//             },
//             method: 'POST',
//             body: JSON.stringify(values),
//         })
//         .then((res) =>{
//             if(res.status === 200){
//                 res.json().then( (res) => {
//                     setMessage("votre projet a été enregistré avec succès !")
//                     setProjects(newProjects)
//                     console.log(res)
//                 })
//             }else{
//                 console.log("hello")
//             }
//         })
//     }

//     return(
//         <section className="office-projects tab-content"> 
//                 <form className="form-projects" onSubmit={subformProject}>
//                              <input type="text" name="titleProject" 
//                                 onChange={handleChangeProject}
//                                 value={values.titleProject } 
//                                 placeholder="title of project"
//                                 className="project-input"
//                             />
        
//                             <input type="text" name="description" 
//                                 onChange={handleChangeProject} 
//                                 value={values.description } 
//                                 placeholder="description of project" 
//                                 className="project-input"
//                             />
//                             <input type="text" name="content" 
//                                 onChange={handleChangeProject} 
//                                 value={values.content }
//                                 placeholder="content of project" 
//                                 className="project-input"
//                             />
        
//                             <button type="submit">Enregistrer</button> 
//                             <p>{message}</p>
//                         </form> 
        
//                         <div className="list-projects">
//                             {
//                                 projects.map((project, index)=>{
//                                     return(
//                                         <Project key={index} project={project}/>
//                                     )
//                                 })
//                             }
//                             {console.log(projects)}
//                         </div>
        
//                     </section>
//     )
// }