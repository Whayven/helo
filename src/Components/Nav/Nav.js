import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { getUser, clearUser } from "../../ducks/reducer";

import "./Nav.css";
import home from "./Icons/home";
import newpost from "./Icons/newpost";
import logout from "./Icons/logout";

class Nav extends Component {
  componentDidMount() {
    this.refreshUser();
  }

  refreshUser = () => {
    axios
      .get("/api/auth/me")
      .then((res) => {
        this.props.getUser(res.data);
      })
      .catch((err) => console.log(err));
  };

  logout = () => {
    axios
      .post("/api/auth/logout")
      .then((_) => {
        this.props.clearUser();
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { username, profile_pic } = this.props;
    if (this.props.location.pathname !== "/") {
      return (
        <nav id="nav">
          <div className="profile-container">
            <img className="profile-picture" src={profile_pic} alt={username} />
            <span className="user-name">{username}</span>
          </div>
          <div className="nav-links">
            <Link to="/dashboard">
              <img className="nav-img" src={home} alt="home" />
            </Link>
            <Link to="/new">
              <img className="nav-img" src={newpost} alt="new post" />
            </Link>
          </div>
          <Link to="/" onClick={this.logout}>
            <img className="nav-img logout" src={logout} alt="logout" />
          </Link>
        </nav>
      );
    } else {
      return <></>;
    }
  }
}

const mapStateToProps = (reduxState) => {
  const { username, profile_pic } = reduxState.user;

  return { username, profile_pic };
};

export default connect(mapStateToProps, { getUser, clearUser })(
  withRouter(Nav)
);
