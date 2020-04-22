import React from 'react';


class OfficeProjects extends React.Component { 
    constructor(props) {
        super(props)
    
        this.state = {
            titleProject:"",
            description:"",
            content:"",
            message:""
           
        }
        this.handleChange = this.handleChange.bind(this);
        this.subformProject = this.subformProject.bind(this);
     
    } 

    handleChange(event){
        let value = event.target.value
        let name = event.target.name; 
        
        this.setState({
            [name]: value 
           
        },console.log(name))
    }; 

    subformProject(event){
        let token = localStorage.getItem('token');
        event.preventDefault();

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
                        message:"votre " + this.state.titleProject +" a été enregistré avec succès !"
                    })
                    console.log(res)
                })
            }
        })
    }


    
    render(){
        return(
            <div id="projects" className="office-projects tab-content"> 
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
               
            </div>
        )
    }
}

export default OfficeProjects

/* 
                {
                    this.state.project.map((item, index) => {
                        return(
                            <div className="project-contain" key={item.id}>
                                <h1>{item.titleProject}</h1>
                                <h3>{item.description}</h3>

                                <p>{item.content}</p>
                            </div>
                        )
                    })
                } */
