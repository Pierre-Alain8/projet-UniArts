// import React, {useState} from 'react';
// import Modal from '@material-ui/core/Modal';


// const Project = (props) =>{
    
//     const {link} = props;
//     // Ce sont les useState qui remplace le this.state et le This.setSate
//     const [values, setValues] = useState({title: "", description: "", content: ""}) ;
   
//     // Les méthodes
//     // Modal:
//     const [open, setOpen] = React.useState(false);

//     const handleOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };


//     const handleChangeProject = (event) =>{
//         const {name, value} = event.target // création de l'event 
//         setValues({...values, [name]: value}) // setState de values en créant une nouvelle entrée dans ls state values  cibler les valeurs des inputs possédant l'attribut name

//     }

//     const subUpdateProject = (event) =>{
//         event.preventDefault();
//         let token = localStorage.getItem('token');
//         let cover = document.getElementById('cover')
      
        
//         let data = new FormData()
//         data.append("cover", cover.files[0])
//         data.append("title", values.title)
//         data.append("description", values.description)
//         data.append("content", values.content)
        
        

//         fetch(`http://localhost:5000/user/updateProject/` + project._id, {
//             headers:{
//                 "Authorization": "Bearer " + token,
//             },
//             method: 'PUT',
//             body: data,
//         })
        
//         .then((res) =>{
//             console.log("title:" + values.title, 
//             "description: " +values.description, 
//             "content: " + values.content,
//             "cover: " + cover.files[0])
//             return res.json()
//         })
//         .then((res) =>{
//             console.log("response:", res)
//         })
//     }

//     const deleteProject = (event) => {
//         let token = localStorage.getItem('token');

//         fetch(`http://localhost:5000/user/deleteProject/` + project._id, {
//             headers:{
//                 "Authorization": "Bearer " + token,
//             },
//             method: 'DELETE',
//         })
//         .then((res) =>{
//             return res.json()
//         })
//         .then((res) =>{
//             console.log('removed success: ', res)
//         })
//     }

  



//     return(  
//         <div className="links">
//            <ul>
//                <li>

//                </li>
//                <li>

//                </li>
//            </ul>
//         </div>

        
   

// )
// }


// export default Project
