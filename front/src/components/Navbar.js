import React from 'react'
import { Link } from 'react-router-dom'; 

class Navbar extends React.Component {

    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
   
    render(){
        return(
            <div className="burgerMenu">

            <div className="barMenu">
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>

            <ul>
                <li><Link to="/">Home</Link></li> 
                <li><Link to="/">Articles</Link></li>
                <li><Link to="/">Les Artistes</Link></li>
                <li><Link to="/">Archive</Link></li>
            </ul>
        </div>
        )
    }
    
}

export default Navbar