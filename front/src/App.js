import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import RequireAuth from './components/RequireAuth';
import Home from './components/Home';
import Header from './components/Header'; 
import Footer from './components/Footer';
import LoginUser from './components/LoginUser'; 
import RegisterUser from './components/RegisterUser'; 
import OfficeUser from './components/OfficeUser';
import ProfileUser from './components/ProfileUser';


class App extends React.Component {
  render() {
    return(
      <BrowserRouter>

        <Header />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/RegisterUser" component={RegisterUser} />
          <Route path="/LoginUser" component={LoginUser} />
          {/* <Route path="/OfficeUser" component={RequireAuth(OfficeUser)} /> */}
          <Route path="/OfficeUser" component={OfficeUser} />
          <Route path="/ProfileUser" component={ProfileUser} />
        </Switch>
        <Footer />


      </BrowserRouter>
    )
  }
}

export default App;
