import React from 'react'; 
import '../css/previewsAricles.css';

const PreviewsArticles = (props) => {

    return(
        <article className="random-reviews">
            <div className="random-articles">
                <h2>ARTISTE 1</h2>
                <button>En savoir plus </button>
            </div>

            <div className="random-articles">
                <h2>ARTISTE 2</h2>
                <button>En savoir plus </button>
            </div>

            <div className="random-articles">
                <h2>ARTISTE 3</h2>
                <button> En savoir plus</button>
            </div>

        </article>
    )
} 

export default PreviewsArticles;