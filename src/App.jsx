import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch, Link } from "wouter";
import "../App.css";
import LoginExtincor from "./pages/Login/login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import HomeExtincor from "./pages/Home/HomeExtincor";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <div>
      <Switch>
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
