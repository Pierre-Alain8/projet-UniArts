import React from 'react'; 
import { Link } from 'react-router-dom';
import { withRouter} from 'react-router-dom';
import '../css/registerUser.css';
// import dotenv from 'dotenv'; 



class RegisterUser extends React.Component {

    constructor(props) {
        super(props); 

        this.state = {
            name: "", 
            pseudo: "", 
            email: "", 
            password: "",
            password2:"",
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
        // dotenv.config() 
        // const port_register = process.env.SCRET_PORT_Register;

        fetch(`http://localhost:8080/user/register` , {
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
                    error:"Votre password doit contenir au moins 1 lettre minuscule, 1 lettre majuscule, 1 caractère numérique et de plus de 8 caractères"
                })
            } else {
                console.log(res)
            }

            if(res.status === 409){
                this.setState({
                    error:"Votre password ne correspond pas au précédent, veuillez le confirmer"
                })
            } else{
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

            <article className="presentation-uniarts">

                <h1>Un collectif d'artises francophones...</h1>

                <p>
                    UniArts est un collectif ayant pour but de mettre en avant divers artistes francophones meritent plus de visibilités, UniArtsts présentera chacun des artistes qui souhaitent rejoindre le collectif. 
                </p> 

                <p> 
                    Car oui...Libre à vous de le rejoindre comme bon vous semble. Il vous sera aussi possible de présenter vos projets, indiquer les liens où on peut découvrir vos travaux, suivre votre activité !  
                </p>

            </article>

            <form className="form-register" onSubmit={this.handleSubmit }> 

                <h2>REGISTER</h2>

                <label> 
                    Name : 
                    <input type="text" id="name" name="name"  
                    placeholder="Enter your name"
                    value={this.state.name } 
                    onChange={this.handleChange } />

                </label> 

                <label> 
                    Pseudo : 
                    <input type="text" id="pseudo" name="pseudo"  
                    placeholder="Enter your pseudo"
                    value={this.state.pseudo } 
                    onChange={this.handleChange } />

                </label>

                <label> 
                    Email : 
                    <input type="email" id="email" name="email" 
                    placeholder="Enter your email"
                    value={this.state.email} 
                    onChange={this.handleChange} />

                </label>

                <label> 
                    Password : 
                    <input type="password" id="password" name="password"  
                    placeholder="Enter your password"
                    value={this.state.password} 
                    onChange={this.handleChange} />
                    
                </label>

                <label> 
                    Password confirm : 
                    <input type="password" id="password" name="password2"  
                    placeholder="Enter your password"
                    value={this.state.password2} 
                    onChange={this.handleChange} />
                    
                </label>

                <button type="submit">INSCRIPTION</button>

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