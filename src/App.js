/*
When user currently logs in they are redirected 
to movies pages and not previous location.
So we pass additional data to Protected Route component.
console.log(props) in the component shows us under location the state is undefined.
Documentation shows Redirect can be to a string or object.
object is a location object, with properties pathname, search, and state.
And using state we can pass any additional data to component we are redirecting user to.
<Redirect to={{
    pathname: "./login",
    state: { from: props.location },
  }}
/>
where location object represents location before login screen.
Now we go to login form component and see if state was set.
We also want to redirect signed in user to homepage if they go to /login.
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
import ProtectedRoute from "./component/common/protectedRoute";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  //initialize state to empty object
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    //setting state will cause app component to rerender
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm}></Route>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/logout" component={Logout}></Route>
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={user} />}
            ></Route>
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
