import React, {Component} from "react"; 
import {Redirect } from "react-router-dom"
// import decode from "jwt-decode";

export default function requireAuth(ComponentToProtect) {
    return class extends Component {
        constructor(){
            super()
            this.state ={

            };
            
            
            this.getToken = this.getToken.bind(this);
        }

        // decodeToken(){
        //     var decoded = jwt_decode(token)
        //     console.log(decoded)
        // }
        
        
        getToken() {
            return localStorage.getItem("token")
        };

        render(){
            try {

                if(!this.getToken("token")) {
                    return <Redirect to='/ProfilUser'/>
                    
                } else {
                    return <Redirect to='/OfficeProfileUser'/>
                }

                
            } catch (error) {
                
            }
                console.log("token")
                return <ComponentToProtect {...this.props} />
        
        }
    }
}
