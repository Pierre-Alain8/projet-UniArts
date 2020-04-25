import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
import { withRouter} from 'react-router-dom';
import '../css/registerUser.css';


const RegisterUser = (props) =>{
    // Les states
    const [values, setValues] = useState({
        name: "", 
        pseudo: "", 
        email: "", 
        password:"", 
        password2:""
    })
    const [error, setError] = useState("")

    // Les méthodes:
    const handleChange = (event) => { 
        // l'évenement permettant de ciblier les valeurs des inputs
        const {name, value} = event.target
        setValues({...values, [name]: value}, console.log(name))
        // récupération des valeurs de manières indépendantes 
    }; 

    const handleSubmit = (event) =>{ 
        event.preventDefault();

        fetch(`http://localhost:5000/user/register` , {
            headers:{
                'Content-Type': 'application/json'  
            },
            method: 'POST',
            body: JSON.stringify(values),
        })
        .then((res) => {
            switch (res.status) {
                case 401:
                    setError("Votre password doit contenir au moins 1 lettre minuscule, 1 lettre majuscule, 1 caractère numérique et de plus de 8 caractères")
                    // this.setState({
                    //     error:"Votre password doit contenir au moins 1 lettre minuscule, 1 lettre majuscule, 1 caractère numérique et de plus de 8 caractères"
                    // })
                    console.log(res)
                    break;

                case 409: 
                setError("Votre password ne correspond pas au précédent, veuillez le confirmer")
                    // this.setState({
                    //     error:"Votre password ne correspond pas au précédent, veuillez le confirmer"
                    // })
                    console.log(res)
                    break;
                case 200:
                    console.log(res)
                    console.log(values.password)
                    props.history.push('/LoginUser')
                    break;
            
                default:
                    break;
            }
            return res.json()
            
        })
        .catch((errors) => {console.log(errors)})
         
        console.log(values)
    };
    
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

            <form className="form-register" onSubmit={handleSubmit }> 

                <h2>REGISTER</h2>

                <label> 
                    Name : 
                    <input type="text" id="name" name="name"  
                    placeholder="Enter your name"
                    value={values.name } 
                    onChange={handleChange } />

                </label> 

                <label> 
                    Pseudo : 
                    <input type="text" id="pseudo" name="pseudo"  
                    placeholder="Enter your pseudo"
                    value={values.pseudo } 
                    onChange={handleChange } />

                </label>

                <label> 
                    Email : 
                    <input type="email" id="email" name="email" 
                    placeholder="Enter your email"
                    value={values.email} 
                    onChange={handleChange} />

                </label>

                <label> 
                    Password : 
                    <input type="password" id="password" name="password"  
                    placeholder="Enter your password"
                    value={values.password} 
                    onChange={handleChange} />
                    
                </label>

                <label> 
                    Password confirm : 
                    <input type="password" id="password" name="password2"  
                    placeholder="Enter your password"
                    value={values.password2} 
                    onChange={handleChange} />
                    
                </label>

                <button type="submit">INSCRIPTION</button>

                <div>
                    <Link to="/loginUser"><p>Vous avez déjà un compte ?</p></Link>
                </div>

                <div className="errorRegister">
                    <p>
                        {error}
                    </p>
                </div>
              
            </form>
        </section>
         
        )

}


export default withRouter(RegisterUser)

// class RegisterUser extends React.Component {

//     constructor(props) {
//         super(props); 

//         this.state = {
//             name: "", 
//             pseudo: "", 
//             email: "", 
//             password: "",
//             password2:"",
//             error : ""
            
//         }

//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
        
//     } 

//     handleChange(event) { 
//         // l'évenement permettant de ciblier les valeurs des inputs
//         const target = event.target;
//         const value = target.value;
//         // l'évenement event.target est rappelé dans les variables let pour cibler les input
//         let name =target.name;
        
//         this.setState({
//             // récupération des valeurs de manières indépendantes 
//             [name]:value,

//         }, console.log(name))

//     }; 

//     handleSubmit(event) { 
//         event.preventDefault();
    

//         fetch(`http://localhost:5000/user/register` , {
//             headers:{
//                 'Content-Type': 'application/json'  
//             },
//             method: 'POST',
//             body: JSON.stringify(this.state),
//         })
//         .then((res) => {
//             switch (res.status) {
//                 case 401:
//                     this.setState({
//                         error:"Votre password doit contenir au moins 1 lettre minuscule, 1 lettre majuscule, 1 caractère numérique et de plus de 8 caractères"
//                     })
//                     console.log(res)
//                     break;

//                 case 409: 
//                     this.setState({
//                         error:"Votre password ne correspond pas au précédent, veuillez le confirmer"
//                     })
//                     console.log(res)
//                     break;
//                 case 200:
//                     console.log(res)
//                     console.log(this.state.password)
//                     this.props.history.push('/LoginUser')
//                     break;
            
//                 default:
//                     break;
//             }
//             return res.json()
            
//         })
//         .catch((errors) => {console.log(errors)})
         

//         // console.log( this.state.pseudo, this.state.name, this.state.email, this.state.pseudo, this.state.password)
//         console.log(this.state)
//     };

//     render(){
//         return(
//         <section className="section-register">

//             <article className="presentation-uniarts">

//                 <h1>Un collectif d'artises francophones...</h1>

//                 <p>
//                     UniArts est un collectif ayant pour but de mettre en avant divers artistes francophones meritent plus de visibilités, UniArtsts présentera chacun des artistes qui souhaitent rejoindre le collectif. 
//                 </p> 

//                 <p> 
//                     Car oui...Libre à vous de le rejoindre comme bon vous semble. Il vous sera aussi possible de présenter vos projets, indiquer les liens où on peut découvrir vos travaux, suivre votre activité !  
//                 </p>

//             </article>

//             <form className="form-register" onSubmit={this.handleSubmit }> 

//                 <h2>REGISTER</h2>

//                 <label> 
//                     Name : 
//                     <input type="text" id="name" name="name"  
//                     placeholder="Enter your name"
//                     value={this.state.name } 
//                     onChange={this.handleChange } />

//                 </label> 

//                 <label> 
//                     Pseudo : 
//                     <input type="text" id="pseudo" name="pseudo"  
//                     placeholder="Enter your pseudo"
//                     value={this.state.pseudo } 
//                     onChange={this.handleChange } />

//                 </label>

//                 <label> 
//                     Email : 
//                     <input type="email" id="email" name="email" 
//                     placeholder="Enter your email"
//                     value={this.state.email} 
//                     onChange={this.handleChange} />

//                 </label>

//                 <label> 
//                     Password : 
//                     <input type="password" id="password" name="password"  
//                     placeholder="Enter your password"
//                     value={this.state.password} 
//                     onChange={this.handleChange} />
                    
//                 </label>

//                 <label> 
//                     Password confirm : 
//                     <input type="password" id="password" name="password2"  
//                     placeholder="Enter your password"
//                     value={this.state.password2} 
//                     onChange={this.handleChange} />
                    
//                 </label>

//                 <button type="submit">INSCRIPTION</button>

//                 <div>
//                     <Link to="/loginUser"><p>Vous avez déjà un compte ?</p></Link>
//                 </div>

//                 <div className="errorRegister">
//                     <p>
//                         {this.state.error}
//                     </p>
//                 </div>
              
//             </form>
//         </section>
         
//         )
//     }
// }