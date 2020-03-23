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

            <ul className="navbar">
                <li><Link to="/">HOME</Link></li> 
                <li><Link to="/">ARTICLES</Link></li>
                <li><Link to="/">LES ARTISTES</Link></li>
                <li><Link to="/">ARCHIVE</Link></li>
            </ul>
        </div>
        )
    }
    
}

export default Navbar