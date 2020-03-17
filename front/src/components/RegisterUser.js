import React from 'react'; 


class RegisterUser extends React.Component {

    constructor(props) {
        super(props); 

        this.state = {
            name: "", 
            pseudo: "", 
            email: "", 
            password:"",
            error : ""
            
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
        

        this.setState({
            // récupération des valeurs de manières indépendantes 
            [name]:value,

        }, console.log(name))

    } 

    handleSubmit(event) { 
        event.preventDefault();

       
        const options = {// options de la requête fetch
            method: 'POST', 
            body: new URLSearchParams(this.state), // les informations que je souhaite récupérer dans le body (les données du user)
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        fetch('http://localhost:8080/user/register', options)
            .then(res => (res ))
            // .then(res => res.json() ) 
            .then( (res )=> {
                if(res.status === 400 ){
                    this.setState({
                        error: "Veuillez vous inscrire pour vous connecter"
                    })
                } else{
                    console.log(res )
                }
                
                if(res.status === 204){
                    this.setState({
                        error: "Inscription impossible  : veuillez remplir tous les champs"
                    })
                } else {
                    console.log(res )
                }

                if(res.status === 200){

                    this.props.history.push('/loginUser')
                } else{ 
                    console.log(res )
                }

            })
            // .catch((errors) => {console.log(errors);})
         

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

                <div className="errorRegister">
                    <p>
                        {this.state.error}
                    </p>
                </div>
              
            </form>
         
        )
    }
}

export default RegisterUser