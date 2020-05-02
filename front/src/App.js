import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RequireAuth from './components/Auth/RequireAuth';
import Home from './components/Home/Home';
import Header from './components/Home/Header'; 
import Footer from './components/Home/Footer';
import LoginUser from './components/Auth/LoginUser'; 
import RegisterUser from './components/Auth/RegisterUser'; 
import OfficeUser from './components/BackOfficeUser/OfficeUser';
import ProfileUser from './components/BackOfficeUser/ProfileUser';
import OfficeAdmin from './components/BackOfficeAdmin/OfficeAdmin';


const App = () => {
  return(
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/RegisterUser" component={RegisterUser} />
          <Route path="/LoginUser" component={LoginUser} />
          <Route path="/OfficeUser" component={OfficeUser} />
          <Route path="/ProfileUser" component={ProfileUser} />
          <Route path="/ArtsUnit/power/admin/auth" component={RequireAuth(OfficeAdmin)} />
        </Switch>
        <Footer />
      </BrowserRouter>
  )
}

export default App;
