import React, {useState} from 'react';
import { Link } from 'react-router-dom'; 
import { withRouter} from 'react-router-dom';
import '../../css/navbar.css';

const Navbar = (props) =>{
    const [display] = useState("none")

    const handleClickHome = () =>{
        props.history.push('/')
    }

    return(
        <div className="menu-contenair">
            <div onClick={handleClickHome} className="logo-contenair">
                <p>
                    UNIARTS            
                </p>
            </div>

            <div className="burgerMenu">

            <div className="barMenu">
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>

            <ul className="navbar" style={{display : display}}>
                <li><Link className="nav-links" to="/">HOME</Link></li> 
                <li><Link className="nav-links" to="/">ARTICLES</Link></li>
                <li><Link className="nav-links" to="/">LES ARTISTES</Link></li>
                <li><Link className="nav-links" to="/">ARCHIVE</Link></li>
            </ul>
            </div>
        </div>
    )
}

// class Navbar extends React.Component {

//     constructor(props) {
//         super(props)
    
//         this.state = {
//             display: "none"
             
//         }
        
//         this.handleClick = this.handleClick.bind(this)
//     }

//     handleClick(){
//         this.props.history.push('/')
//     }

    
   
//     render(){
//         return(
//             <div className="menu-contenair">
//                 <div onClick={this.handleClick } className="logo-contenair">
//                     <p>
//                         UNIARTS            
//                     </p>
//                 </div>

//                 <div className="burgerMenu">

//                 <div className="barMenu">
//                     <div className="bar1"></div>
//                     <div className="bar2"></div>
//                     <div className="bar3"></div>
//                 </div>

//                 <ul className="navbar" style={{display : this.state.display}}>
//                     <li><Link className="nav-links" to="/">HOME</Link></li> 
//                     <li><Link className="nav-links" to="/">ARTICLES</Link></li>
//                     <li><Link className="nav-links" to="/">LES ARTISTES</Link></li>
//                     <li><Link className="nav-links" to="/">ARCHIVE</Link></li>
//                 </ul>
//                 </div>
//             </div>
//         )
//     }
    
// }

export default withRouter(Navbar);