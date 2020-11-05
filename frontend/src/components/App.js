import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AuthRoute from "./AuthRoute";
import Header from "./Header";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import Signout from "./auth/Signout";
import EditUser from "./user/EditUser";
import UserList from "./user/UserList";
import Profile from "./user/Profile";
import ManageRestaurantList from "./restaurant/ManageRestaurantList";
import UserRestaurantList from "./restaurant/UserRestaurantList";
import RestaurantDetail from "./restaurant/RestaurantDetail";
import CreateRestaurant from "./restaurant/CreateRestaurant";
import EditRestaurant from "./restaurant/EditRestaurant";
import PendingReviews from "./review/PendingReviews";

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
            <AuthRoute exact path="/profile" component={Profile} />
            <AuthRoute
              exact
              permit="admin"
              path="/users"
              component={UserList}
            />
            <AuthRoute
              exact
              permit="admin"
              path="/users/:userId/edit"
              component={EditUser}
            />
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
            <AuthRoute
              exact
              permit="owner"
              path="/reviews"
              component={PendingReviews}
            />

            <AuthRoute
              exact
              permit="admin,owner,regular"
              path="/"
              components={{
                admin: ManageRestaurantList,
                owner: PendingReviews,
                customer: UserRestaurantList,
              }}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
}
