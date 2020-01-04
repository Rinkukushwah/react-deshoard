import React, { Component } from 'react';
import axios from 'axios';
import ImageUploader from 'react-images-upload';
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
          title: '',
          description: ''
      }

    this.handleInputChange = this.handleInputChange.bind(this);
    
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleInputChange(e) {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }

  componentDidMount(){
    var edit_url = this.props.match.params["id"]
    axios.get(`http://localhost:3001/posts/${edit_url}/edit`)
    .then(post=>{
      this.setState({title: post.data.title, description: post.data.description});
    })
    .catch(function(error){
      console.log(error);
    })
  }

  onSubmit(event) {
    var edit_url = this.props.match.params["id"]
    var title = this.state.title
    var description = this.state.description
    var post = {post: {title: title, description: description}}
    event.preventDefault();
    axios.post(`http://localhost:3001/posts/${edit_url}/update_post`, post, {
    })
    .then(user => {
      alert("Successfuly Update");
      window.location = "/posts"
    })
  }
  render() {
    return (
      <div style={{marginTop: 10}}>
        <h3>Profile</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>First Name:  </label>
            <input name ="title" value={this.state.title} onChange={this.handleInputChange}  type="text" className="form-control"/>
          </div>
          <div className="form-group">
            <label>Last Name:  </label>
            <textarea name ="description" value={this.state.description} onChange={this.handleInputChange}  type="text" className="form-control"/>
          </div>
          
          <div className="form-group">
            <input type="submit" value="Register" className="btn btn-primary"/>
          </div>
        </form>
      </div>
    )
  }
}