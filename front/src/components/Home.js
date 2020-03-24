import React from 'react';
import PreviewsArticles from './PreviewsArticles';
import { withRouter} from 'react-router-dom';
import '../css/home.css'


class Home extends React.Component { 
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }
    
    handleClick(){
        this.props.history.push('/RegisterUser')
    }
    
    render(){
        return(
            <section className="home-uniarts"> 

                <div className="title-home">
                    <h1>UNIARTS</h1>
                </div>

                <div className="link-register">
                    <button className="button-link-register" onClick={this.handleClick }>Nous rejoindre !</button> 
                    <div className="arrow-link">
                        <img src="img/arrow-right.png" alt="Vous voulez rejoindre le collectif ?" />
                    </div>
                </div>  

               <PreviewsArticles /> 
               
            </section>
        )
    }
}

export default withRouter(Home)