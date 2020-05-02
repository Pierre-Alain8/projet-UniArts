import React, {useState, useEffect} from 'react';
import Links from './Links';

const OfficeLinks = (props) =>{
    const [links, setLinks] = useState([])
    const [message, setMessage] = useState("")
    const [values, setValues] = useState({linkTitle: "", linkContent: ""})

     // ComponentDitMount & ComponentDitUpdate:
     useEffect(() => {
        let token = localStorage.getItem('token');

        fetch(`http://localhost:5000/user/getAllLinks`,{
            headers:{
                "Authorization": "Bearer " + token
            },
            method: 'GET',
        })
        .then((res) =>{
            return res.json()
        })
        .then((res) =>{
            setLinks(res.linkId)
            
            console.log("getAllLinks: ",res);
            console.log("Links: ",res.linkId);
           
        })
        .catch(error => console.log(error))
    },[])


    const handleChangeLink = (event) => {
        const {name, value} = event.target
        setValues({...values, [name]: value}, console.log(name)) 
    }

    const subformLink = (event) => {
        let token = localStorage.getItem('token'); 
        let newLinks = [...links, values]
        event.preventDefault();

        fetch(`http://localhost:5000/user/addLink`, {
            headers:{
                'Content-Type' : 'application/json',
                "Authorization": "Bearer " + token,
            },
            method: 'POST',
            body: JSON.stringify(values),
        })
        .then((res) =>{
            if(res.status === 200){
                res.json().then( (res) => {
                    setMessage("votre lien a été enregistré avec succès !")
                    setLinks(newLinks)
                    console.log(res)
                })
            }else{
                console.log(res)
                console.log("hello")
            }
        })
    }

    return(
        <section className="office-links tab-content"> 
                <form className="form-links" onSubmit={subformLink}>  
                    <input type="text" name="linkTitle" 
                        onChange={handleChangeLink} 
                        value={values.linkTitle} 
                        placeholder="add title of links" 
                    />

                    <input type="text" name="linkContent"
                        onChange={handleChangeLink} 
                        value={values.linkContent} 
                        placeholder="add the content of link" 
                    />
                    <button type="submit">Enregistrer</button> 
                    <p>{message}</p>
                </form>

                <div className="list-links">
                    {
                        links.map((link, index)=>{
                            return(
                                <Links key={index} link={link}/>
                            )
                        })
                    }
                </div>

            </section>

    )
}


// class OfficeLinks extends React.Component { 
//     constructor(props) {
//         super(props)
    
//         this.state = {
//             linkTitle:"",
//             linkContent:"",
//             message:""
//         }
//         this.handleChange = this.handleChange.bind(this);
//         this.subformLink = this.subformLink.bind(this);
//     } 

//     handleChange(event){
//         let value = event.target.value
//         let name = event.target.name; 
        
//         this.setState({
//             [name]: value 
           
//         },console.log(name))
//     };

//     subformLink(event){
//         let token = localStorage.getItem('token'); 
//         event.preventDefault();

//         fetch(`http://localhost:5000/user/addLink`, {
//             headers:{
//                 'Content-Type' : 'application/json',
//                 "Authorization": "Bearer " + token,
//             },
//             method: 'POST',
//             body: JSON.stringify(this.state),
//         })
//         .then((res) =>{
//             console.log(res)
//             return res.json()

//         })
//         .then((res) =>{
//             console.log(res)
//         })
//     }

    
//     render(){

//         return(
//             <section className="office-links tab-content"> 
//                 <form className="form-links" onSubmit={this.subformLink}>  
//                     <input type="text" name="linkTitle" 
//                         onChange={this.handleChange} 
//                         value={this.state.linkTitle} 
//                         placeholder="add title of links" 
//                     />

//                     <input type="text" name="linkContent"
//                         onChange={this.handleChange} 
//                         value={this.state.linkContent} 
//                         placeholder="add the link" 
//                     />
//                     <button type="submit">Enregistrer</button> 
//                     <p>{this.state.message}</p>
//                 </form>

//                 <div className="links-content">

//                 </div>
//             </section>
//         )
//     }
// }

export default OfficeLinks