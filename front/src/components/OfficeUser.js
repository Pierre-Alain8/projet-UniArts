import React, {useEffect} from 'react';
import { withRouter} from 'react-router-dom';
import '../css/officeUser.css'; 
import TabsOfficeUser from './TabsOfficeUser';


const OfficeUser = (props) =>{

   useEffect(() =>{
        let token = localStorage.getItem('token')
        if(!token)
        props.history.push('/');
   })

   return(
    <section className="officeUser">     
        <TabsOfficeUser />
    </section>
   )
}
export default withRouter(OfficeUser)

