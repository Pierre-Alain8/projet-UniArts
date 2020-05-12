import React, {useEffect} from 'react';
// import PropTypes from 'prop-types';
import { withRouter} from 'react-router-dom';
import '../css/officeUser.css'; 
import OfficeProfile from './OfficeProfile';
import OfficeProjects from './OfficeProjects';
import OfficeLinks from './OfficeLinks';

const OfficeUser = (props) =>{

   useEffect(() =>{
        let token = localStorage.getItem('token')
        if(!token)
        props.history.push('/');
   })

   return(
    <section className="officeUser">     
        <OfficeProfile /> 
        <OfficeProjects />
        <OfficeLinks />
    </section>
   )
}

// propsType

export default withRouter(OfficeUser)

