import React from 'react';


class OfficeProfile extends React.Component { 
    constructor(props) {
        super(props)
    
        this.state = {
            about:"",
            fliedAbout:"",
            file:"",
            avatar:"", 
        }
        this.handleChangeAvatar = this.handleChangeAvatar.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.subFormProfile = this.subFormProfile.bind(this);     
        
    } 

    componentDidMount(){
        let token = localStorage.getItem('token');
        console.log(token);
        fetch('http://localhost:5000/user/getById',{
            headers:{
                "Authorization": "Bearer " + token
            },
            method: 'GET', 
        })
        .then((res) =>{
            return res.json()
        })
        .then((res) =>{
            console.log("getByid :", res)
            if (res.avatar === "") {
                this.setState({
                    avatar: "http://localhost:5000/uploads/avatar-default.png"
                })
            }else{
                this.setState({
                    avatar:"http://localhost:5000/uploads/" + res.avatar
                })
            }
        })
    }


    handleChangeAvatar(event){
        let token = localStorage.getItem('token');

        let data = new FormData();
        data.append("avatar",  event.target.files[0]);

        fetch(`http://localhost:5000/user/updateAvatar`, {
            headers:{
                "Authorization": "Bearer " + token
            },
            method: 'PUT', 
            body: data,
        })
        .then((res) =>{
            return res.json()
        })
        .then((res) =>{
            console.log(res)
            this.setState({
                avatar:"http://localhost:5000/uploads/" + res
            })
            // Je récupère la reponse de l'update, et comme celle-ci contient le filename
            // Je setState en concatenant l'adresse d' l'upload des images avec la réponse
            
        })
        .catch(error => console.log(error))
    };
     

    handleChange(event){
        let value = event.target.value
        let name = event.target.name; 
        
        this.setState({
            [name]: value 
           
        },console.log(value))
    }; 

    subFormProfile(event){
        event.preventDefault()
        let token = localStorage.getItem('token');
        const {about} = this.state.about

        fetch(`http://localhost:5000/user/updateProfile`,{
            headers:{
                "Authorization": "Bearer " + token
            },
            method: 'PUT', 
            body: JSON.stringify({about:about}),
        })
        .then((res) =>{
            return res.json(about)
        })
        .then((res) =>{
            this.setState({
                fliedAbout: res.about
            },console.log("response: " + res.name),
            console.log("updateProfile: " + res.about))
        })
    }

    
    render(){
        return(
            <section className="office-profile"> 

                <form className="form-Avatar" onSubmit={this.subFormAvatar } > 
                    <label>Avatar</label>
                    <input id="avatar" type="file" name="avatar" onChange={this.handleChangeAvatar }/>
                    <div className="avatar-contain">
                        <img className="avatar" src={this.state.avatar} alt="user avatar" />
                    </div>
                    {/* <button type="submit">Enregistrer</button> */}
                </form>

                <form className="form-profile" onSubmit={this.subFormProfile }>
                    <input type="text" name="about" placeholder="About..." 
                    value={this.state.about } 
                    onChange={this.handleChange} 
                    /> 
                    <p>{this.state.fliedAbout }</p>
                    <button type="submit">Enregistrer</button>
                </form>

                  
              
               
            </section>
        )
    }
}

export default OfficeProfile

// subFormAvatar(event){
//     event.preventDefault();

//     let token = localStorage.getItem('token');

//     let data = new FormData();
//     data.append("avatar", this.state.file);

//     fetch(`http://localhost:5000/user/updateAvatar`, {
//         headers:{
//             "Authorization": "Bearer " + token
//         },
//         method: 'PUT', 
//         body: data,
//     })
//     .then((res) =>{
//         // console.log("getByid :", res.json())
//         return res.json()
//     })
//     .then((res) =>{
//         console.log(res)
//         this.setState({
//             avatar:"http://localhost:5000/uploads/" + res
//         })
//         // Je récupère la reponse de l'update, et comme celle-ci contient le filename
//         // Je setState en concatenant l'adresse d' l'upload des images avec la réponse
        
//     })
//     .catch(error => console.log(error))
// };