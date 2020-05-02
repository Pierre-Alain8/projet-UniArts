import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import decode from "jwt-decode"; 

export default function requireAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false
      };
    }

    getToken() {
      return localStorage.getItem("token");
    }

    loggedIn() {
      const token = this.getToken(); 
      return !!token && !this.isTokenExpired(token); 
    }
  
    isTokenExpired(token) {
      try {
        const decoded = decode(token);
        console.log(" decoded ", decoded);
        if (decoded.exp < Date.now() / 1000) {
          // on check la date d'expiration qui est dans le token 
          return true; // token expiré
        } else return false;
      } catch (err) {
        return false;
      }
    }

    logout() {
      localStorage.removeItem("token");
    }

    componentDidMount() {
      if (this.loggedIn()) {
        console.log("loggedIn ok ");
        this.setState({ loading: false });
      } else {
        console.log("loggedIn not ok ");
        this.logout(); // par sécurité
        this.setState({ loading: false, redirect: true }); // on redirige vers /login
      }
    }
    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/LoginUser" />;
      }
      return <ComponentToProtect {...this.props} />;
    }
  };
}


