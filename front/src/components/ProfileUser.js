import React from 'react';
import { withRouter} from 'react-router-dom';
// import '../css/home.css'


class ProfileUser extends React.Component { 
    constructor(props) {
        super(props)
    
        this.state = {
            nameUser: ""
             
        }
    }
    
    render(){
        return(
            <section className="section-profile"> 

                <div>
                    Bienvenue sur le profile de <p className="testProfilUser">{this.state.nameUser} </p>!
                </div>
               
            </section>
        )
    }
}

export default withRouter(ProfileUser)