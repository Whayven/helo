import React, { Component } from "react";
import {connect} from "react-redux";
import {getUser} from "../../ducks/reducer";
import axios from "axios";
import "./Auth.css";
import logo from "./logo";

class Auth extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
    };
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUsernameChange(username) {
    this.setState({ username });
  }

  handlePasswordChange(password) {
    this.setState({ password });
  }

  login() {
    const { username, password } = this.state;
    axios
      .post("/api/auth/login", { username, password })
      .then((res) => {
        this.props.getUser(res.data)
        this.props.history.push("/dashboard");
      })
      .catch((err) => console.log(err));
  }

  register() {
    const { username, password } = this.state;
    axios
      .post("/api/auth/register", { username, password })
      .then((res) => {
        this.props.history.push("/dashboard");
      })
      .catch((err) => console.log(err));
    this.setState({ username: "", password: "" });
  }

  render() {
    const { username, password } = this.state;
    return (
      <div id="auth">
        <div className="auth-container">
          <img src={logo} alt="logo"></img>
          <h1 className="brand">Helo</h1>
          <div className="input-container">
            <label>Username: </label>
            <input
              className="auth-input"
              type="text"
              value={username}
              onChange={(e) => this.handleUsernameChange(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label>Password: </label>
            <input
              className="auth-input"
              type="password"
              value={password}
              onChange={(e) => this.handlePasswordChange(e.target.value)}
            />
          </div>
          <div className="button-container">
            <button className="auth-button" onClick={this.login}>
              Login
            </button>
            <button className="auth-button" onClick={this.register}>
              Register
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, {getUser})(Auth);
