/*

*/

import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    //Call to Server
    try {
      const { data } = this.state;
      //returns a promise, which we await, and mark function as async
      await auth.login(data.username, data.password);
      //set state to location object of previous page.
      const { state } = this.props.location;
      //full reload of application so app component will mount again
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        //ex.response.data is message given back by server
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    /*
    Redirect to homepage if already logged in, incase user goes to /login
    We don't use window.location here because we use that 
    only when user is trying to log in and we remount application to be in right state.
    */
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
