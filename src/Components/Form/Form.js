import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux"
import { withRouter } from "react-router-dom";

import "./Form.css";
import placeholderImg from "./placeholderImg";

class Form extends Component {
  constructor() {
    super();

    this.state = {
      title: "",
      img: "",
      content: ""
    }
  }

  handleTitle = (title) => {
    this.setState({ title });
  }

  handleImgUrl = (img) => {
    this.setState({ img });
  }

  handleContent = (content) => {
    this.setState({ content });
  }

  createPost = () => {
    const { title, img, content } = this.state;
    const { user_id } = this.props.user;

    axios.post(`/api/post/${user_id}`, { title, img, content })
    .catch((err) => console.log(err));

    this.setState({
      title: "",
      img: "",
      content: ""
    })
    this.props.history.push("/dashboard");
  }

  render() {
    const { title, img, content } = this.state;
    const previewImg = img.length > 0 
    ? <div className="form-img" alt="preview" style={{backgroundImage:`url(${img})`}} />
    : <div className="form-img" alt="preview" style={{backgroundImage:`url(${placeholderImg})`}} />
    
    return (
      <div className="form form-container">
        <h2 className="title">New Post</h2>
        <div className="form-input-box">
          <p>Title:</p>
          <input value={title} type="text" className="form-input" onChange={(e) => this.handleTitle(e.target.value)} />
        </div>
        {previewImg}
        <div className="form-input-box">
          <p>Image URL:</p>
          <input value={img} type="text" className="form-input" onChange={(e) => this.handleImgUrl(e.target.value)} />
        </div>
        <div className="form-text-box">
          <p>Content:</p>
          <textarea value={content} onChange={(e) => this.handleContent(e.target.value)} />
        </div>
        <div className="form-panel">
          <button className="form-button" onClick={this.createPost}>Post</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (reduxState) => {
  const { user } = reduxState;

  return { user };
};

export default connect(mapStateToProps)(withRouter(Form))