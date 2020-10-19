import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";

import "./EditPost.css";

class EditPost extends Component {
  constructor() {
    super();

    this.state = {
      title: "",
      img: "",
      content: "",
      id: null
    }
  }

  componentDidMount() {
    this.getPost(this.props.match.params.postid);
  }

  getPost = (id) => {
    axios
      .get(`/api/post/${id}`)
      .then((res) => {
        const { title, img, content, post_id } = res.data;
        this.setState({ title, img, content, id: post_id });
      })
      .catch((err) => console.log(err));
  };

  handleTitle = (title) => {
    this.setState({ title });
  }

  handleImgUrl = (img) => {
    this.setState({ img });
  }

  handleContent = (content) => {
    this.setState({ content });
  }

  updatePost = () => {
    const { title, img, content, id } = this.state;

    axios.put(`/api/post/${id}`, { title, img, content })
    .catch((err) => console.log(err));

    this.setState({
      title: "",
      img: "",
      content: ""
    })
    this.props.history.push(`/post/${id}`);
  }

  render() {
    const { title, img, content } = this.state;
    
    return (
      <div className="form form-container">
        <h2 className="title">New Post</h2>
        <div className="form-input-box">
          <p>Title:</p>
          <input value={title} type="text" className="form-input" onChange={(e) => this.handleTitle(e.target.value)} />
        </div>
        <div className="form-img" alt="preview" style={{backgroundImage:`url(${img})`}} />
        <div className="form-input-box">
          <p>Image URL:</p>
          <input value={img} type="text" className="form-input" onChange={(e) => this.handleImgUrl(e.target.value)} />
        </div>
        <div className="form-text-box">
          <p>Content:</p>
          <textarea value={content} onChange={(e) => this.handleContent(e.target.value)} />
        </div>
        <div className="form-panel">
          <button className="form-button" onClick={this.updatePost}>Post</button>
        </div>
      </div>
    )
  }
}

export default withRouter(EditPost)