import React from 'react'; 
import '../css/previewsAricles.css';

class PreviewsArticles extends React.Component {
    // constructor(props) {
    //     super(props)
    
    //     this.state = {
             
    //     }
    // }

    render(){
        return(
            <article className="random-reviews">
                <div className="random-articles">
                    <h2>ARTISTE 1</h2>
                    <p>Artiste 1, vidéaste réalisant...</p>
                    <button>En savoir plus </button>
                </div>

                <div className="random-articles">
                    <h2>ARTISTE 2</h2>
                    <p>Artiste 2, illustrateur...</p>
                    <button>En savoir plus </button>
                </div>

                <div className="random-articles">
                    <h2>ARTISTE 3</h2>
                    <p>Artiste 3, conçoit des musiques originale...</p>
                    <button> En savoir plus</button>
                </div>

            </article>

        )
    }
    
}

export default PreviewsArticles;