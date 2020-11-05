import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AuthRoute from "./AuthRoute";
import Header from "./Header";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import Signout from "./auth/Signout";
import ManageRestaurantList from './restaurant/ManageRestaurantList';
import UserRestaurantList from './restaurant/UserRestaurantList';
import RestaurantDetail from './restaurant/RestaurantDetail';
import CreateRestaurant from './restaurant/CreateRestaurant';
import EditRestaurant from './restaurant/EditRestaurant';


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
              <AuthRoute
                exact
                permit="admin,owner,regular"
                path="/restaurants"
                components={{
                  admin: ManageRestaurantList,
                  owner: ManageRestaurantList,
                  customer: UserRestaurantList,
                }}
              />
              <AuthRoute
                exact
                permit="admin,owner"
                path="/restaurants/new"
                component={CreateRestaurant}
              />
              <AuthRoute
                exact
                permit="admin,owner"
                path="/restaurants/:restaurantId/edit"
                component={EditRestaurant}
              />

              <AuthRoute
                exact
                path="/restaurants/:restaurantId"
                component={RestaurantDetail}
              />
            </Switch>
          </div>
        </div>
      </Router>
  );
}
