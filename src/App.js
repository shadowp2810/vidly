/*
Here in App Component it would be nice to have current user in state,
and then when rendering current nav bar, passing the user as a prop.
Can also pass the user to any other components in component tree.
install `npm i jwt-decode@2.2.0`
Passing an invalid code or null to decode function gives us an exception.
So we wrap in try catch block.

NavBar is a Functional component where we can either pass props or destructed property.
Then with user property we conditionally render Login and Register or Username and Logout.
But to show change requires refresh as componentdidmount only executes at start.
So instead of redirecting to homepage from login and register forms, 
we reload full application so it mounts again.
*/

import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
//import default function from module
import jwtDecode from "jwt-decode";
import Movies from "./component/movies";
import MovieForm from "./component/movieForm";
import Customers from "./component/customers";
import Rentals from "./component/rentals";
import NotFound from "./component/notFound";
import NavBar from "./component/navBar";
import LoginForm from "./component/loginForm";
import RegisterForm from "./component/registerForm";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  //initialize state to empty object
  state = {};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      //setting state will cause app component to rerender
      this.setState({ user });
    } catch (ex) {}
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm}></Route>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/movies/:id" component={MovieForm}></Route>
            <Route path="/movies" component={Movies}></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
