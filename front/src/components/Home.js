import React from 'react';
import PreviewsArticles from './PreviewsArticles'
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
            <section className="home-uniarts"> 
                <div className="link-register">
                    <button className="button-link-register" onClick={this.handleClick}>Nous rejoindre !</button>
                </div>  

               <PreviewsArticles /> 
               
            </section>
        )
    }
}

export default withRouter(Home)