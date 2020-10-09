import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import "./Nav.css";
import home from "./Icons/home";
import newpost from "./Icons/newpost";
import logout from "./Icons/logout";

const Nav = withRouter((props) => {
  const { user } = props;
  if (props.location.pathname !== "/") {
    return (
      <nav id="nav">
        <div className="profile-container">
          <img
            className="profile-picture"
            src={user.profile_pic}
            alt={user.username}
          />
          <span className="user-name">{user.username}</span>
        </div>
        <div className="nav-links">
          <Link to="/dashboard">
            <img className="nav-img" src={home} alt="home" />
          </Link>
          <Link to="/new">
            <img className="nav-img" src={newpost} alt="new post" />
          </Link>
        </div>
        <Link to="/">
          <img className="nav-img logout" src={logout} alt="logout" />
        </Link>
      </nav>
    );
  } else {
    return <></>;
  }
});

const mapStateToProps = (reduxState) => {
  const { user } = reduxState;

  return { user };
};

export default connect(mapStateToProps)(Nav);
