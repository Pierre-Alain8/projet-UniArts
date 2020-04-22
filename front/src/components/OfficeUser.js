import React from 'react';
import { withRouter} from 'react-router-dom';
import '../css/officeUser.css'; 
import OfficeProfile from './OfficeProfile';
import OfficeProjects from './OfficeProjects';
import OfficeLinks from './OfficeLinks';


class OfficeUser extends React.Component { 
    constructor(props) {
        super(props)
    
        this.state = {
            active: "active"
        }
        // this.showTabs = this.showTabs.bind(this);     
    } 

    componentDidMount(){

        let token = localStorage.getItem('token')
        if(!token)
         this.props.history.push('/');
        
    };

    // showTabs(event){
    //     event.preventDefault()
    //     const target = event.currentTarget;
    //     const office = target.dataset.office;
    //     console.log(office)
    // }
    
    
    render(){
        return(
            <section className="officeUser"> 
            
                <OfficeProfile /> 
                <div className="tabs">
                    <button className="tabsLink active">
                        <p data-title="Projects">PROJETS</p>
                    </button>
                    <button className="tabsLink">
                        <p data-title="Links">LINKS</p>
                    </button>
                </div>
                <OfficeProjects />
                <OfficeLinks />
               
            </section>
        )
    }
}

export default withRouter(OfficeUser)