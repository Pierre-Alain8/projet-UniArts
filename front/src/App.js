import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header'; 
import Footer from './components/Footer'
import loginUser from './components/LoginUser'; 
import RegisterUser from './components/RegisterUser'; 
import './App.css'

class App extends React.Component {
  render() {
    return(
      <BrowserRouter>

        <Header />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/registerUser" component={RegisterUser} />
          <Route path="/loginUser" component={loginUser} />
        </Switch>
        <Footer />


      </BrowserRouter>
    )
  }
}

export default App;
