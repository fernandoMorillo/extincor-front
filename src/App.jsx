import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, Link } from "wouter";
import "../App.css";
import LoginExtincor from "./pages/Login/login";
import ForgotPassword   from "./pages/ForgotPassword/ForgotPassword";
import HomeExtincor from "./pages/Home/HomeExtincor";

const App = () => {
  return (
    <div>
      <Switch>
        <Route path="/" component={LoginExtincor} />
          <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/home" component={HomeExtincor} />
      </Switch>
    </div>
  );
};

export default App;
