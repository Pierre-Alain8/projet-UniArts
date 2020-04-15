import React from 'react';


class OfficeProfile extends React.Component { 
    constructor(props) {
        super(props)
    
        this.state = {
            about:"",
            avatar:"", 
            defaultAvatar:"http://localhost:5000/uploads/avatar-default.png"
        }
        this.handleChange = this.handleChange.bind(this);
        this.subFormProfile = this.subFormProfile.bind(this)
    } 

    handleChange(event){
        let value = event.target.value
        let name = event.target.name; 
        
        this.setState({
            [name]: value, 
           
        })
    }; 

    subFormProfile(event){
        event.preventDefault();

        let token = localStorage.getItem('token');

        let avatar = document.getElementById('avatar');
        let data = new FormData();
        data.append("avatar", avatar.files[0]);
        data.append("about", this.state.about);

        fetch(`http://localhost:5000/user/updateProfile`, {
            headers:{
                "Authorization": "Bearer " + token
            },
            method: 'PUT', 
            body: data,
        })
        .then((res) => {

            if(res.status === 200) {
                this.setState({
                    defaultAvatar: avatar
                })
            }
        })
        .catch(error => console.log(error))
    }


    
    
    render(){
        return(
            <section className="office-profile"> 

              <form className="form-Profile" onSubmit={this.subFormProfile }> 
                    <label>Avatar</label>
                    <input id="avatar" type="file" name="avatar" />
                    <div className="avatar-contain">
                        <img className="avatar" src={this.state.defaultAvatar} alt="user avatar" />
                    </div>

                    <input type="text" name="about" placeholder="About..." value={this.state.about } onChange={this.handleChange}  /> 
                    <button type="submit">Enregistrer</button>
              </form>
               
            </section>
        )
    }
}

export default OfficeProfile
