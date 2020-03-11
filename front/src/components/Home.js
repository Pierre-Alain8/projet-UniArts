import React from 'react';
import { withRouter} from 'react-router-dom';


class Home extends React.Component { 
    constructor(props) {
        super(props)
    
        this.state = {
             
        }

        this.handleClick = this.handleClick.bind(this)
    }
    
    handleClick = () =>{
        this.props.history.push('/registerUser')
    }
    
    render(){
        return(
            <section> 
                <article>
                    <button onClick={this.handleClick}>Nous rejoindre !</button>
                </article>
            </section>
        )
    }
}

export default withRouter(Home)