import React from 'react';
// import Navbar from './Navbar'

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

                    <div className="logo-contenair">
                        <p>
                            UNIARTS            
                        </p>

                    </div>

                    <div className="menu-contenair">
                        {/* <Navbar /> */}
                       
                    </div>    
                </div>

            </section>
        )
    }
    
}

export default Header