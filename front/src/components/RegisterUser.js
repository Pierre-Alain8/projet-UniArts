import React from 'react'; 


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
        
        
        const target = event.target;
        const value = target.value;
        let name =target.name;
        let pseudo =target.value;
        let email =target.email; 
        let password =target.value;

        this.setState({
            [name]: value,
            [pseudo]:value,
            [email]:value,
            [password]:value

        })

    } 

    handleSubmit(event) { 
        event.preventDefault();

        const options = {
            method: 'POST', 
            body: new URLSearchParams(this.state),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        fetch('http://localhost:8080/user/register', options)
            .then(res => console.log(res ))
            .catch((errors) => {console.log(errors);})

        // console.log( this.state.pseudo, this.state.name, this.state.email, this.state.pseudo, this.state.password)

    }

    render(){
        return(
         
            <form onSubmit={this.handleSubmit }>
                <label> 
                    Name : 
                    <input type="text" name="name" value={this.state.name } onChange={this.handleChange } />
                </label> 

                <label> 
                    Pseudo : 
                    <input type="text"name="pseudo" value={this.state.pseudo } onChange={this.handleChange } />
                </label>

                <label> 
                    Email : 
                    <input type="email"  name="email" value={this.state.email} onChange={this.handleChange } />
                </label>

                <label> 
                    password : 
                    <input type="password" name="password"  value={this.state.password} onChange={this.handleChange } />
                </label>

                <input type="submit" />
              
            </form>
         
        )
    }
}

export default RegisterUser