import React from 'react'; 
import { Link } from 'react-router-dom';
import { withRouter} from 'react-router-dom';

class LoginUser extends React.Component {

    constructor(props) {
        super(props); 

        this.state = {
            email:"", 
            password:"", 
            error:""
            
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    } 


    handleChange(event) {

        const target = event.target;
        const value = target.value;
        let name = target.name;

        this.setState({
            // récupération des valeurs de manières indépendantes 
            [name]: value,

        }, console.log(name))

    };

    handleSubmit(event){
        event.preventDefault();

        const{email, password } = this.state

        fetch(`http://localhost:8080/user/login`, {
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'  
            },
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
        })
        .then((res) => {
            // if(res.status === 201 ){
            //     this.setState({
            //         error: "user not found"
            //     })
            //     console.log(res)
            // } else{
            //     console.log(res)
            // }
            
            if(res.status === 400){
                this.setState({
                    error: "Veuillez entrez un password valide"
                })
            } else {
                console.log(res )
            }

            if(res.status === 200) {

                res.json().then( (res) => {
                
                    localStorage.setItem('token', res.token); 
                    this.props.history.push('/OfficeUser')
                    console.log(res.token)   
            
                })
            }
    
        })
       

    };

    render(){
        return(
         
        <section className="section-login">
            <form onSubmit={this.handleSubmit }>
                <label> 
                    Email : 
                    <input type="email" name="email" 
                    value={this.state.email } 
                    onChange={this.handleChange } />

                </label>

                <label> 
                    password : 
                    <input type="password" name="password"  
                    value={this.state.password } 
                    onChange={this.handleChange } />
                    
                </label>

                <button type="submit">Connexion</button>

                <div>
                    <Link to="/registerUser"><p>Vous n'avez pas de compte ?</p></Link>
                </div>

                <div className="errorLogin">
                    <p>
                        {this.state.error }
                    </p>
                </div>
              
            </form>
        </section>
         
        )
    }
}; 

export default withRouter(LoginUser)