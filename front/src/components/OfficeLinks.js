import React from 'react';


class OfficeLinks extends React.Component { 
    constructor(props) {
        super(props)
    
        this.state = {
            linkTitle:"",
            linkContent:"",
            message:""
        }
        this.handleChange = this.handleChange.bind(this);
        this.subformLink = this.subformLink.bind(this);
    } 

    handleChange(event){
        let value = event.target.value
        let name = event.target.name; 
        
        this.setState({
            [name]: value 
           
        },console.log(name))
    };

    subformLink(event){
        let token = localStorage.getItem('token'); 
        event.preventDefault();

        fetch(`http://localhost:5000/user/addLink`, {
            headers:{
                'Content-Type' : 'application/json',
                "Authorization": "Bearer " + token,
            },
            method: 'POST',
            body: JSON.stringify(this.state),
        })
        .then((res) =>{
            console.log(res)
            return res.json()

        })
        .then((res) =>{
            console.log(res)
        })
    }

    
    render(){

        return(
            <section className="office-links tab-content"> 
                <form className="form-links" onSubmit={this.subformLink}>  
                    <input type="text" name="linkTitle" 
                        onChange={this.handleChange} 
                        value={this.state.linkTitle} 
                        placeholder="add title of links" 
                    />

                    <input type="text" name="linkContent"
                        onChange={this.handleChange} 
                        value={this.state.linkContent} 
                        placeholder="add the link" 
                    />
                    <button type="submit">Enregistrer</button> 
                    <p>{this.state.message}</p>
                </form>

                <div className="links-content">

                </div>
            </section>
        )
    }
}

export default OfficeLinks