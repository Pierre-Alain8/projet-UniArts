import React from 'react'; 
import { Link } from 'react-router-dom';
import { withRouter} from 'react-router-dom';


class RegisterUser extends React.Component {

    constructor(props) {
        super(props); 

        this.state = {
            name: "", 
            pseudo: "", 
            email: "", 
            password: "",
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

    }; 

    handleSubmit(event) { 
        event.preventDefault();

        fetch(`http://localhost:8080/user/register`, {
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'  
            },
            method: 'POST',
            body: JSON.stringify(this.state),
        })
        .then((res) => {

            if(res.status === 401){
                this.setState({
                    error:"Votre password doit contenir au moins 1 lettre minuscule, 1 lettre majuscule, 1 caractères spéciacle, 1 caractère numérique et de plus de 8 caractères"
                })
            } else {
                console.log(res)
            }

            if(res.status === 400 ){
                this.setState({
                    error: "Inscription impossible  : veuillez remplir tous les champs"
                });
            } else{
                console.log(res )
            }
            
            if(res.status === 200){

                console.log(res)
                console.log(this.state.password)
                this.props.history.push('/LoginUser')
            }

            return res.json()
            
        })
        .catch((errors) => {console.log(errors)})
         

        // console.log( this.state.pseudo, this.state.name, this.state.email, this.state.pseudo, this.state.password)
        console.log(this.state)
    };

    render(){
        return(
        <section className="section-register">
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
                    onChange={this.handleChange} />

                </label>

                <label> 
                    password : 
                    <input type="password" id="password" name="password"  
                    value={this.state.password} 
                    onChange={this.handleChange} />
                    
                </label>

                <button type="submit">Inscription</button>

                <div>
                    <Link to="/loginUser"><p>Vous avez déjà un compte ?</p></Link>
                </div>

                <div className="errorRegister">
                    <p>
                        {this.state.error}
                    </p>
                </div>
              
            </form>
        </section>
         
        )
    }
}

export default withRouter(RegisterUser)