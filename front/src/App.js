import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import RequireAuth from "./components/register_login/RequireAuth";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import LoginUser from "./components/register_login/LoginUser";
import RegisterUser from "./components/register_login/RegisterUser";
import OfficeUser from "./components/personal_space_user/OfficeUser";
import ProfileUser from "./components/profile_user/ProfileUser";
import OfficeAdmin from "./components/personal_space_admin/OfficeAdmin";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/RegisterUser" component={RegisterUser} />
        <Route path="/LoginUser" component={LoginUser} />
        <Route path="/OfficeUser" component={RequireAuth(OfficeUser)} />
        <Route path="/ProfileUser" component={ProfileUser} />
        <Route
          path="/ArtsUnit/power/admin/auth"
          component={RequireAuth(OfficeAdmin)}
        />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
