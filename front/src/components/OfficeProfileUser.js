import React from 'react';
import { withRouter} from 'react-router-dom';
// import '../css/home.css'


class OfficeProfileUser extends React.Component { 
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
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

export default withRouter(OfficeProfileUser)