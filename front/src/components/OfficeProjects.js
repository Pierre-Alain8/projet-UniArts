import React from 'react';


class OfficeProjects extends React.Component { 
    constructor(props) {
        super(props)
    
        this.state = {
           
        }

     
    } 


    
    
    render(){
        return(
            <section className="office-projects"> 
                <form className="form-projects">
                    <input type="texte" name="titleProject" placeholder="title of project" />
                    <input type="texte" name="cover" placeholder="cover of project" />
                    <input type="texte" name="description" placeholder="description of project" />
                    <input type="texte" name="content" placeholder="content of project" />

                    <button>Enregistrer</button> 
                    <button>Modifier</button>
                    <button>Supprimer</button>
                </form>
              
               
            </section>
        )
    }
}

export default OfficeProjects
