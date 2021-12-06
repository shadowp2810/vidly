/*
Sending to request to registration endpoint on postman,
returns 9 Headers key value pairs sent by server.
X-Powered-By(Express), Access-Control-Allow-Origin(*),
x-auth-token(eyJhbGciOiJIUzI1NiIsInR5cCI...),
Content-Type(application/json; charset=utf-8),
Content-Length(76), ETag(W/"4c-idlySe+LMzpTse9YL9TSk+Sm254"),
Date(Mon, 06 Dec 2021 21:15:50 GMT), Connection(keep-alive),
Keep-Alive(timeout=5).
x-auth-token is a custom header. Headers that start with x are custom,
and not part of standard http protocol. At the backend this was set as JWT,
so with this when you register a user, you can read the http header,
extract the JWT, store it in local storage, and redirect user.
You might return this in body of response instead.
In the vidly-api-node directory, under routes, we open users.js,
we see router.post, which means went request is sent, this will be executed,
under the line .header("x-auth-token", token) where we set custom header,
if we want client to be able to read this header we need to set an additional header,
which is a standard http header.
We add line .header("access-control-expose-headers", "x-auth-token")
This header lets webserver whitelist, that is header browser or server is allowed to access.
Resubmitting the registration form and looking at response object 
now shows the custom header which is the JWT which we can now read and store in local storage.
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
