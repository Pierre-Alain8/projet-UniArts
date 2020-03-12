import React from 'react'; 
// import { json } from 'body-parser';


class RegisterUser extends React.Component {

    constructor(props) {
        super(props); 

        this.state = {
            name: "", 
            pseudo: "", 
            email: "", 
            password:""
            
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    } 

    handleChange(event) {
        
        // l'évenement permettant de ciblier les valeurs des inputs
        const target = event.target;
        const value = target.value;
        // l'évenement event.target est rappelé dans les variables let pour cibler les input
        let name =target.name;
        let pseudo =target.name;
        let email =target.name; 
        let password =target.name;

        this.setState({
            // récupération des valeurs de manières indépendantes 
            [name]:value,
            [pseudo]:value,
            [email]:value,
            [password]:value

        }, console.log(name))

    } 

    handleSubmit(event) { 
        event.preventDefault();

        // options de la requête fetch
        const options = {
            method: 'POST', 
            body: new URLSearchParams(this.state),
        // les informations que je souhaite récupérer dans le body (les données du user)
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        fetch('http://localhost:8080/user/register', options)
            .then(res => console.log(res ))
            // .then( res =>{return res.json() })
            .then(res => console.log(res ))
            .catch((errors) => {console.log(errors);})
         

        // console.log( this.state.pseudo, this.state.name, this.state.email, this.state.pseudo, this.state.password)
        console.log(this.state)
    }

    render(){
        return(
         
            <form onSubmit={this.handleSubmit }>
                <label> 
                    Name : 
                    <input type="text" id="name" name="name" 
                    value={this.state.name } 
                    onChange={this.handleChange } />

                </label> 

                <label> 
                    Pseudo : 
                    <input type="text" id="pseudo" name="pseudo" 
                    value={this.state.pseudo } 
                    onChange={this.handleChange } />

                </label>

                <label> 
                    Email : 
                    <input type="email" id="email" name="email" 
                    value={this.state.email} 
                    onChange={this.handleChange } />

                </label>

                <label> 
                    password : 
                    <input type="password" id="password" name="password"  
                    value={this.state.password} 
                    onChange={this.handleChange } />
                    
                </label>

                <input type="submit" />
              
            </form>
         
        )
    }
}

export default RegisterUser