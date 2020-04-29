import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import Home from './components/Home';
import Header from './components/Header'; 
import Footer from './components/Footer';
import LoginUser from './components/LoginUser'; 
import RegisterUser from './components/RegisterUser'; 
import OfficeUser from './components/OfficeUser';
import ProfileUser from './components/ProfileUser';
import OfficeAdmin from './components/OfficeAdmin';


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
