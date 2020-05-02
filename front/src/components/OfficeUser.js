import React, {useEffect} from 'react';
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

export default withRouter(OfficeUser)


// class OfficeUser extends React.Component { 
//     constructor(props) {
//         super(props)
    
//         this.state = {
//             active: "active"
//         }   
//     } 

//     componentDidMount(){

//         let token = localStorage.getItem('token')
//         if(!token)
//          this.props.history.push('/');
        
//     };
    
    
//     render(){
//         return(
//             <section className="officeUser"> 
            
//                 <OfficeProfile /> 
//                 <OfficeProjects />
//                 <OfficeLinks />
               
//             </section>
//         )
//     }
// }