import React from 'react';
import '../css/header.css';
import { withRouter} from 'react-router-dom';
import Navbar from './Navbar';

class Header extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(){
        this.props.history.push('/')
    }

    render(){
        return(
            <section className="header-Uniarts">

                <div className="header-contenair">

                    <div onClick={this.handleClick } className="logo-contenair">
                        <p>
                            UNIARTS            
                        </p>

                    </div>

                    <div className="menu-contenair">
                        <Navbar />
                       
                    </div>    
                </div>

            </section>
        )
    }
    
}

export default withRouter(Header)