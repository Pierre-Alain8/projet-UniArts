import React from 'react';
import '../css/header.css';
import { withRouter} from 'react-router-dom';
import Navbar from './Navbar';

class Header extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }

    render(){
        return(
            <section className="header-Uniarts">

                <div className="header-contenair">
                    <Navbar />
                </div>

            </section>
        )
    }
    
}

export default withRouter(Header)