import React, {useState} from 'react';
import PropTypes from 'prop-types';

const Links = (props) =>{
    
    const {link} = props;
    // Ce sont les useState qui remplace le this.state et le This.setSate
    const [values, setValues] = useState({linkTitle: "", linkContent: ""}) ;
   
    // Les méthodes

    
    const handleChangeLink = (event) =>{
        const {name, value} = event.target // création de l'event 
        setValues({...values, [name]: value}) // setState de values en créant une nouvelle entrée dans ls state values  cibler les valeurs des inputs possédant l'attribut name

    }

    const subUpdateLink = (event) =>{
        event.preventDefault();
        let token = localStorage.getItem('token');

        fetch(`http://localhost:5000/user/updateLink/` + link._id, {
            headers:{
                "Authorization": "Bearer " + token,
                'Content-Type': 'application/json'  
            },
            method: 'PUT',
            body: JSON.stringify(values),
        })
        
        .then((res) =>{
            console.log("linkTitle:" + values.linkTitle, 
            "content: " + values.linkcontent)

            return res.json()
        })
        .then((res) =>{
            props.getLink()
            console.log("response:", res)
        })
    }

    const deleteLink= (event) => {
        event.preventDefault()
        let token = localStorage.getItem('token');

        fetch(`http://localhost:5000/user/deleteLink/` + link._id, {
            headers:{
                "Authorization": "Bearer " + token,
            },
            method: 'DELETE',
        })
        .then((res) =>{
            return res.json()
        })
        .then((res) =>{
            props.getLink()
            console.log('removed success: ', res)
        })
    }

    return(  
        <div className="links-container">
            <form onSubmit={subUpdateLink}>
                <ul className="Link" id={link._id} >
                    <li>
                        <p>{link.linkTitle}</p>
                        <input type="text" name="linkTitle" 
                            onChange={handleChangeLink} 
                            value={values.linkTitle} 
                            placeholder="add title of links" 
                        />

                        <p>{link.linkContent}</p>
                            <input type="text" name="linkContent"
                            onChange={handleChangeLink} 
                            value={values.linkContent} 
                            placeholder="add the content of link" 
                        />

                        <button  type="submit" className="validate-link">
                            <img src="img/button-validate.png" alt="button-validate"/>
                            Actualisé
                        </button>
                    </li>
                </ul>
           </form>

           <button className="delete-link" onClick={deleteLink} >
                <img src="img/button-delete.png" alt="button-delete"/> 
                Supprimer
            </button>
        </div>

        
   

)
}

Links.propTypes = {
   link: PropTypes.object
};
Links.defaultProps = {
   link: {}
};


export default Links
