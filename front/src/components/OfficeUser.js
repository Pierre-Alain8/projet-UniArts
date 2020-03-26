import React from 'react';
import { withRouter} from 'react-router-dom';
import '../css/officeUser.css'


class OfficeUser extends React.Component { 
    constructor(props) {
        super(props)
    
        this.state = {
            nameUser: ""
        }

        this.getUser = this.getUser.bind(this)
    } 

    componentDidMount(){

        let token = localStorage.getItem('token')
        if(!token)
         this.props.history.push('/');
    };
    
    
    getUser(){


    }
    
    render(){
        return(
            <section className="section-profile"> 

                <div>
                    Bienvenue sur votre profil : <span>{this.state.nameUser}</span>!
                </div>
               
            </section>
        )
    }
}

export default withRouter(OfficeUser)