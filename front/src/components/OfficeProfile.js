import React from 'react';
// import port from '../port/port'


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
        this.handleChangeProfile = this.handleChangeProfile.bind(this);
        this.subFormProfile = this.subFormProfile.bind(this);     
        
    } 

    componentDidMount(){
        let token = localStorage.getItem('token');
        fetch('http://localhost:5000/user/getById',{
            headers:{
                "Authorization": "Bearer " + token
            },
            method: 'GET'
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
     

    handleChangeProfile(event){
        let value = event.target.value
        let name = event.target.name; 
        
        this.setState({
            [name]: value 
           
        },console.log(name))
    }; 

    subFormProfile(event){
        event.preventDefault()
        let token = localStorage.getItem('token');
        const {about} = this.state;

        fetch(`http://localhost:5000/user/updateProfile`,{
            headers:{
                'Content-Type' : 'application/json',
                Accept: 'application/json',
                "Authorization": "Bearer " + token
            },
            method: 'PUT',
            body: JSON.stringify({"about": about})
        })
        .then((res) =>{
            console.log(about)
           return res.json()
        })
        .then((res) => {
            console.log(res)
            this.setState({
                fliedAbout: about
            })
        })
        .catch((errors) => {console.log(errors)})
        
    }

    
    render(){
        return(
            <div className="office-profile"> 

                <form className="form-Avatar" onSubmit={this.subFormAvatar } > 
                    <label>Avatar</label>
                    <input id="avatar" type="file" name="avatar" onChange={this.handleChangeAvatar }/>
                    <div className="avatar-contain">
                        <img className="avatar" src={this.state.avatar} alt="avatar" />
                    </div>
                    {/* <button type="submit">Enregistrer</button> */}
                </form>

                <form className="form-profile" onSubmit={this.subFormProfile }>
                    <input type="text" name="about" placeholder="About..." 
                    value={this.state.about } 
                    onChange={this.handleChangeProfile} 
                    /> 
                    <p>{this.state.fliedAbout }</p>
                    <button type="submit">Enregistrer</button>
                </form>
               
            </div>
        )
    }
}

export default OfficeProfile

