import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AuthRoute from "./AuthRoute";
import Header from "./Header";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import Signout from "./auth/Signout";

export default function App() {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")));
  return (
      <Router>
        <div className="App">
          <Header />
          <div className="main container py-4 mt-2">
            <Switch>
              <Route exact path="/signin" component={Signin} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/signout" component={Signout} />
            </Switch>
          </div>
        </div>
      </Router>
  );
}
