import React from 'react';


class OfficeProfile extends React.Component { 
    constructor(props) {
        super(props)
    
        this.state = {
            about:"",
            file:"",
            avatar:"", 
        }
        this.handleChangeAvatar = this.handleChangeAvatar.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // this.subFormAvatar = this.subFormAvatar.bind(this);     
        
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
            // console.log("getByid :", res.json())
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
    //Au chargement du component:  Je récupère les donées liées au user avec l'id (contenu dans le token),
    //  dans la première promesse je retorune les données de la réponse au format json.
    // Ensuite dans le second promesse, si l'utilisateur n'a aps d'avatar je luui setState un avatar par défault
    // Sinon je concataine l'adresse où sont upload les imagesavec le filename de l'avatar contenu dans la réponse

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
            // console.log("getByid :", res.json())
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
            [name]: value, 
           
        })
    }; 

    
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

                <form className="form-profile">
                    <input type="text" name="about" placeholder="About..." value={this.state.about } onChange={this.handleChange}  /> 
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