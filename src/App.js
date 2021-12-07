/*
Currently we are unable to delete movies,
and fails with error 403 Forbidden,
because the backend is implemented such that only admins can delete a movie.
In vidly-node-api, inside routes folder, movies module,
on line 67 we are setting up a route handler,
which is telling express, the frameword used to build the application,
that if you get a delete request to movies endpoint, make sure client is autenticated,
and is an admin. So auth and admin are two functions. 
These are refered to a middlewear functions.
In the middlewear folder, auth.js, we see auth is a function,
which checks config to see if authentication is enabled or not,
and if its disabled it simple passes to next middlewear function,
otherwise reads the header from request,
and if you don't have token returns response with 401 Unathorizes, custom message Access Denied.
If you do have a token it tries to validate it 
and it it's valid it passes control to next middlewear function,
otherwise returns status with 400, custom message Invalid Token.
This was the auth middlewear function, now we look at admin middlewear function.
At beginning of functions checks if authentication is diabled and passes to next middlewear function.
Otherwise checks to see if current user is admin, 
and if is falsy sends status 403, custom message Access Denied.
Which is exactly what we get here. 
So in this case client sent a valid jwt, but was not an admin,
so server didn't allow operation.
To fix this issue, we need to go to database and set this property to true.
We can go to compass and add new property isAdmin: true, as a boolen.
Since the token currently being used was from before, we need to relogin and get new token.
Decoding the token shows us this user is an admin, which means we should be able to delete movie.
Here we manually make a user an admin, 
but in production we need a complete user interface for managing users and permission,
which is not covered in course. Generally speaking, first time you deploy application,
should have atleast one admin user. Can be done manually or maybe through a script. 
*/

import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./component/movies";
import MovieForm from "./component/movieForm";
import Customers from "./component/customers";
import Rentals from "./component/rentals";
import NotFound from "./component/notFound";
import NavBar from "./component/navBar";
import LoginForm from "./component/loginForm";
import RegisterForm from "./component/registerForm";
import Logout from "./component/logout";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  //initialize state to empty object
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
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
            <Route path="/logout" component={Logout}></Route>
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
