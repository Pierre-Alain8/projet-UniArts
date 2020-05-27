import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import RequireAuth from "./components/register_login/RequireAuth";
import OfficeAdmin from "./components/personal_space_admin/OfficeAdmin";
import LoginUser from "./components/register_login/LoginUser";
import RegisterUser from "./components/register_login/RegisterUser";
import OfficeUser from "./components/personal_space_user/OfficeUser";
import ProfileUser from "./components/profile_user/ProfileUser";
import Home from "./components/home/Home";
import Discovery from "./components/discovery_page/discovery";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/DiscoveryPage" component={Discovery} />
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
