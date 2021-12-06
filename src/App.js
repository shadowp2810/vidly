/*
When the user successfully logs in, they get a JSON Web Token.
We should store this JWT on the client.
Every browser has a small database called local storage.
And in this database we can store key value pairs.
So here when we await the promise we get from our login function,
we get the response object, this response has a property called data,
so we can use object destructering to pick the data property,
but because we already defined data earlier, we rename it to jwt.
With this we can get JWT in body of response.
then localStorage.setItem("token", jwt);
We open up chrome dev tooks and check under application tab,
local storage per domain localhost:3001,
and in this domain we have a database with key("token") value(JWT) pairs.
Then we navigate user to homepage. this.props.history.push('/')
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
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar />
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
