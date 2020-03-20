import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header'; 
import Footer from './components/Footer'
import LoginUser from './components/LoginUser'; 
import RegisterUser from './components/RegisterUser'; 
import ProfileUserOffice from './components/ProfileUserOffice';
import './App.css'


class App extends React.Component {
  render() {
    return(
      <BrowserRouter>

        <Header />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/RegisterUser" component={RegisterUser } />
          <Route path="/LoginUser" component={LoginUser } />
          <Route path="/ProfileUserOffice" component={ProfileUserOffice } />
        </Switch>
        <Footer />


      </BrowserRouter>
    )
  }
}

export default App;
