import React from 'react';
import Projects from './Projects'

class OfficeProjects extends React.Component { 
    constructor(props) {
        super(props)
    
        this.state = {
            titleProject:"",
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

        fetch('http://localhost:5000/getAllProjects',{
            headers:{
                "Authorization": "Bearer " + token
            },
            method: 'GET'
        })
        .then((res) =>{
            return res.json()
        })
        .then((res) =>{
            this.setState({
                projects: res.projectId
            })
            console.log(res);
        })
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
                id: "ProjectId", 
                titleProject: this.state.titleProject, 
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
                        message:"votre " + this.state.titleProject +" a été enregistré avec succès !",
                        projects
                    })
                    console.log(res)
                })
            }
        })
    }

    
    render(){
        return(
            <section className="office-projects tab-content"> 
                <form className="form-projects" onSubmit={this.subformProject}>
                    <input type="text" name="titleProject" 
                        onChange={this.handleChange}
                        value={this.state.titleProject } 
                        placeholder="title of project"
                    />

                    <input type="text" name="description" 
                        onChange={this.handleChange} 
                        value={this.state.description } 
                        placeholder="description of project" 
                    />
                    <input type="text" name="content" 
                        onChange={this.handleChange} 
                        value={this.state.content }
                        placeholder="content of project" 
                    />

                    <button type="submit">Enregistrer</button> 
                    <p>{this.state.message}</p>
                </form> 

                <div className="list-projects">
                    {
                        this.state.projects.map((item, index) =>{
                            return(
                                <Projects
                                    key={item.id}
                                    id={item.id}
                                    titleProject={this.state.titleProject}
                                    descriptionProject={this.state.description}
                                    contentProject={this.state.content}
                                />
                            )
                            
                        })
                    }
                </div>
            </section>
        )
    }
}

export default OfficeProjects
