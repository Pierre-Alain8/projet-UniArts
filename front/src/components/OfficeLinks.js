import React from 'react';


class OfficeLinks extends React.Component { 
    constructor(props) {
        super(props)
    
        this.state = {
           
        }

     
    } 


    
    
    render(){
        return(
            <section className="office-links"> 
                <div className="form-links">  
                    <input type="text" name="links" placeholder="add links" />
                    <button>Enregistrer</button> 
                    <button>Modifier</button>
                    <button>Supprimer</button>
                </div>
              
               
            </section>
        )
    }
}

export default OfficeLinks