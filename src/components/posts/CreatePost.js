// app/javascript/bundles/posts/CreatePost.js
import React, { Component } from 'react';
import axios from 'axios';
export default class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleInputChange(event){
    const {name, value} = event.target;
    this.setState({ [name]: value });
  }

  onSubmit(event){
    var title = this.state.title
    var description = this.state.description
    var post = {post: {title: title, description: description}}
    event.preventDefault();
    axios.post(`http://localhost:3001/posts/create_post?token=${localStorage.token}`, post, { })
    .then(post =>{
      alert('Post created successfully');
      location.href = `/posts/${post.data.id}`;
    })
  }

  render() {
    const {title, description} = this.state;
    return (
      <div>
        <h3>New Post</h3>        
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Title:  </label>
            <input name = "title" value={title} onChange={this.handleInputChange}  type="text" className="form-control"/>
          </div>
          <div className="form-group">
            <label>Description:  </label>
            <textarea name = "description" value={description} onChange={this.handleInputChange} className="form-control"/>
          </div>
          
          <div className="form-group">
            <input type="submit" value="Register" className="btn btn-primary"/>
          </div>
        </form>
      </div>
    );
  }
}

