import React from 'react';
import { withRouter} from 'react-router-dom';
// import '../css/home.css'


class ProfileUser extends React.Component { 
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render(){
        return(
            <section className="section-profile"> 

                <div>
                    Bienvenue sur le profile de l'artiste!
                </div>
               
            </section>
        )
    }
}

export default withRouter(ProfileUser)