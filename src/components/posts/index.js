import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    error: null,
      all_posts: []
    }
  }

  componentDidMount() {
    const headers = {
      'Content-Type': 'application/json',
      'User-Token': localStorage.token
    }
    axios.get(`http://localhost:3001/posts`, {
    headers: headers
    })
    .then(result => {
      this.setState({
        all_posts: result.data
      });
    })
  } 
  render() {
    const { error, all_posts} = this.state;

    if(error) {
      return (
        <div>Error: {error.message}</div>
      )
    } else {
      return(
        <div>
          <h2>Post List</h2>
          <table className="table">
            <thead>
              <tr>
                <th>#ID</th>
                <th>Title</th>
                <th>Description name</th>
                <th>User</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {all_posts.map(post => (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>{post.description}</td>
                  <td>{post.user_id}</td>
                  
                  <td><Link to={"/edit/"+post.id} className="btn btn-primary">Edit</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }
  }
}

export default Index;
