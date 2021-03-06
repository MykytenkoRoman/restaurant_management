import React from "react";
import { Route, Redirect } from "react-router-dom";
import moment from "moment-timezone";

const AuthRoute = ({ roles, component, components, ...rest }) => {
  let isAuthenticated = true;
  let permitted = true;
  const auth = JSON.parse(localStorage.getItem("auth"));
  if (auth) {
    isAuthenticated = true;
  } else {
    isAuthenticated = false;
  }

  if (roles && isAuthenticated) {
    const { user } = auth;
    permitted = roles.split(",").includes(user.role);
  }
  let Component = component;

  if (components && auth) {
    Component = components[auth.user.role];
  }
  
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated === true ? (
          permitted ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          )
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
};

export default AuthRoute;
