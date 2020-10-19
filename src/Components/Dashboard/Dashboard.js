import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import Loading from "../Loading/Loading";

import "./Dashboard.css";
import searchIcon from "./Icons/searchIcon";

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      userposts: true,
      search: "",
      posts: [],
    };
  }

  componentDidMount() {
    const { user_id } = this.props.user;
    const { search, userposts } = this.state;
    axios
      .get(`/api/posts/${user_id}`, {
        params: {
          userposts,
          search,
        },
      })
      .then((res) => this.setState({ posts: res.data }));
  }

  handleSearchChange = (search) => {
    this.setState({ search });
  };

  toggleMyPosts = () => {
    this.setState({ userposts: !this.state.userposts });
  };

  reset = () => {
    const { user_id } = this.props.user;
    const { userposts } = this.state;
    axios
      .get(`/api/posts/${user_id}`, {
        params: {
          userposts,
        },
      })
      .then((res) => this.setState({ posts: res.data, search: "" }));
  };

  render() {
    const { search, userposts, posts } = this.state;
    // Map posts from state into elements
    const allPosts = !posts.length
      ? <Loading />
      : posts.map((post, i) => {
          const { post_id, title, author_pic, author } = post;
          return (
            <Link to={`/post/${post_id}`} key={i}>
              <div  className="post-box dash-container">
                <h2>{title}</h2>
                <div className="author-box">
                  <span>By {author}</span>
                  <img className="post-pfp" src={author_pic} alt="Author" />
                </div>
              </div>
            </Link>
          );
        });

    return (
      <div id="dashboard">
        <div className="dash-container search-container">
          <div className="input-box">
            <input
              className="search-input"
              value={search}
              placeholder="Search by title"
              onChange={(e) => {
                this.handleSearchChange(e.target.value);
              }}
            />
            <button className="search-button" onClick={this.search}>
              <img
                className="search-button-img"
                src={searchIcon}
                alt="search"
              />
            </button>
            <button className="reset-button" onClick={this.reset}>
              Reset
            </button>
          </div>
          <div>
            <span>My Posts</span>
            <input
              value={userposts}
              type="checkbox"
              onClick={this.toggleMyPosts}
              defaultChecked={userposts}
            />
          </div>
        </div>
        <div className="dash-container posts-container">{allPosts}</div>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  const { user } = reduxState;

  return { user };
};

export default connect(mapStateToProps)(Dashboard);
