import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import loginUser from './components/LoginUser'; 
import RegisterUser from './components/RegisterUser'; 
import './App.css'

class App extends React.Component {
  render() {
    return(
      <BrowserRouter>
          <div>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/registerUser" component={RegisterUser} />
              <Route path="/loginUser" component={loginUser} />
            </Switch>
          </div>
      </BrowserRouter>
    )
  }
}

export default App;
