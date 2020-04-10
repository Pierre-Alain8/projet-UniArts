import React from 'react';
import { withRouter} from 'react-router-dom';
import '../css/officeUser.css'; 
import OfficeProfile from './OfficeProfile';
import OfficeProjects from './OfficeProjects';
import OfficeLinks from './OfficeLinks';


class OfficeUser extends React.Component { 

    componentDidMount(){

        let token = localStorage.getItem('token')
        if(!token)
         this.props.history.push('/');
        
    };
    
    
    render(){
        return(
            <section className="officeUser"> 
                <OfficeProfile /> 
                <OfficeProjects />
                <OfficeLinks />
              
               
            </section>
        )
    }
}

export default withRouter(OfficeUser)