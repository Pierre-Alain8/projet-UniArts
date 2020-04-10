import React from 'react';


class OfficeProfile extends React.Component { 
    constructor(props) {
        super(props)
    
        this.state = {
            name:"",
            avatar: "",
            about:"",
        }
        this.handleChange = this.handleChange.bind(this);
        this.subFormProfile = this.subFormProfile.bind(this)

     
    } 

    handleChange(event){
        const target = event.target;
        const value = target.value;
        let name = target.name;
        

        this.setState({
            [name]:value,
            avatar: event.target.files[0]

        })
    }; 

    subFormProfile(event){
        event.preventDefault();

        let token = localStorage.getItem('token');
        let data = new FormData();
        data.append("avatar", this.state.avatar);
        data.append("about", this.state.about);

        fetch(`http://localhost:5000/user/updateProfile`, {
            header:{
                "Authorization": "Bearer " + token
            },
            method: 'PUT', 
            body: data,
        })
        .then((res) => {

            if(res.status === 200) {

                res.json().then( (res) => {
                    console.log(res)   
                })
            }
        })
        .catch(error => console.log(error))
    }


    
    
    render(){
        let avatar = "http://localhost:5000/uploads/avatar-default.png";
        return(
            <section className="office-profile"> 

              <form className="form-Profile" onSubmit={this.subFormProfile }> 
                    <label>Avatar</label>
                    <input type="file" name="avatar" onChange={this.handleChange} />
                    <div className="avatar-contain">
                        <img className="avatar" name="avatar" src={avatar} alt="user avatar" />
                    </div>

                    <input type="texte" name="about" placeholder="About..." value={this.state.about } onChange={this.handleChange}  /> 
                    <button type="submit">Enregistrer</button>
              </form>
               
            </section>
        )
    }
}

export default OfficeProfile
