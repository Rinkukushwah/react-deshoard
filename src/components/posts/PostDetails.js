import React, { Component } from 'react';
import axios from 'axios';



export default class PostDetails extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	title: '',
    	description: '',
    	user_id: '',
    	first_name: '',
    	last_name: '',
    	user_email: ''
     };
  }


  componentDidMount(){
    var edit_url = this.props.match.params["id"]
    axios.get(`http://localhost:3001/posts/${edit_url}`)
    .then(post=>{
      this.setState({id: post.data.data.post.id, title: post.data.data.post.title, description: post.data.data.post.description, user_id: post.data.data.post.user_id, first_name:  post.data.data.user.first_name, last_name: post.data.data.user.last_name, user_email: post.data.data.user.email});
    })
    .catch(function(error){
      console.log(error);
    })
  }
  render(){
  	return (
  		<div>
        <div>
          <strong> Title </strong>
          <p> {this.state.title} </p>
        </div>

        <div>
          <strong> Description </strong>
          <p> {this.state.description} </p>
        </div>

        <div>
          <strong> User <br /></strong>
          { this.state.first_name || this.state.last_name &&
          <p> {this.state.first_name} {this.state.last_name}</p>
          }
          { !this.state.first_name && !this.state.last_name &&

          <p> {this.state.user_email}</p>
          }
        </div>
      </div>
  	)
  }
}