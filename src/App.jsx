import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch, Link } from "wouter";
import "../App.css";
import LoginExtincor from "./pages/Login/Login.jsx";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import HomeExtincor from "./pages/Home/HomeExtincor";
import Blog from "./pages/Blog/Blog";
import ExtincorLanding from "./pages/Blog/ExtincorLanding";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <div>
      <Switch>
        <Route path="/" component={ExtincorLanding} />
        <Route path="/login" component={LoginExtincor} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/home/*">
          <ProtectedRoute>
            <HomeExtincor />
          </ProtectedRoute>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
