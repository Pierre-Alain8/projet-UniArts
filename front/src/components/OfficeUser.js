import React from 'react';
import { withRouter} from 'react-router-dom';
import '../css/officeUser.css'


class OfficeUser extends React.Component { 
    constructor(props) {
        super(props)
    
        this.state = {
             
        }

       
    } 

    componentDidMount(){

        let token = localStorage.getItem('token')
        if(!token)
         this.props.history.push('/');

    }
    
    render(){
        return(
            <section className="section-profile"> 

                <div>
                    Bienvenue sur votre profil !
                </div>
               
            </section>
        )
    }
}

export default withRouter(OfficeUser)