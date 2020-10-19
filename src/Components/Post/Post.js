import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import Loading from "../Loading/Loading";

import "./Post.css";

class Post extends Component {
  constructor() {
    super();

    this.state = {
      post: null,
    };
  }

  componentDidMount() {
    this.getPost(this.props.match.params.postid);
  }

  getPost = (id) => {
    axios
      .get(`/api/post/${id}`)
      .then((res) => {
        this.setState({ post: res.data });
      })
      .catch((err) => console.log(err));
  };

  deletePost = (id) => {
    axios
      .delete(`/api/post/${id}`)
      .then((res) => {
        this.props.history.push("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  render() {
    if (this.state.post) {
      const {
        post_id,
        title,
        author_id,
        author,
        author_pic,
        img,
        content,
      } = this.state.post;
      const { user_id } = this.props.user;
      const displayPanel =
        author_id === user_id ? (
          <div className="post-panel">
            <button
              className="post-button"
              onClick={() => this.deletePost(post_id)}
            >
              Delete
            </button>
            <button className="post-button">
              <Link to={`/edit/${post_id}`}>
                Edit
              </Link>
            </button>
          </div>
        ) : (
          <div className="post-panel"></div>
        );
      return (
        <div className="post post-container">
          <div>
            <div className="post-header">
              <h2 className="title">{title}</h2>
              <div className="author-box">
                <p>by {author}</p>
                <img src={author_pic} alt="author" />
              </div>
            </div>
            <div className="post-content">
              <div
                className="post-image"
                style={{ backgroundImage: `url(${img})` }}
                alt="post"
              />
              <p>{content}</p>
            </div>
          </div>
          {displayPanel}
        </div>
      );
    } else {
      return (
        <div className="post post-container">
          <Loading />
        </div>
      );
    }
  }
}

const mapStateToProps = (reduxState) => {
  const { user } = reduxState;

  return { user };
};

export default connect(mapStateToProps)(withRouter(Post));
