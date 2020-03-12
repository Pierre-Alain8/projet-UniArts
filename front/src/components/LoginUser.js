import React from 'react'; 

class LoginUser extends React.Component {

    constructor(props) {
        super(props); 

        this.state = {
            email:"", 
            password:""
            
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    } 

    handleChange(event) {
        
       
        const target = event.target;
        const value = target.value;
       
        
        let email =target.email; 
        let password =target.value;
    

        this.setState({
            // récupération des valeurs de manières indépendantes 
            [email]:value,
            [password]:value

        }, console.log(email, password))

    } 

    handleSubmit(event){
        event.preventDefault() 

        const options = {
            method: 'POST', 
            body: new URLSearchParams(this.state),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        fetch('http://localhost:8080/user/login', options)
        .then(res => console.log(res ))
        .catch((errors) => {console.log(errors);})


    }

    render(){
        return(
         
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

                <input type="submit" />
              
            </form>
         
        )
    }
}; 

export default LoginUser