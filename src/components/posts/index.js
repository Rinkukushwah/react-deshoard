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
    this.fetchPostsList();
  }

  fetchPostsList = () => {
    axios.get(`http://localhost:3001/posts`, {
    })
    .then(result => {
      this.setState({
        all_posts: result.data
      });
    })
  };


  handleDelete(post){
    console.log("******************************************", post)
    axios.get(`http://localhost:3001/posts/${post}/delete_post`, {
    })
    .then(post => {
      alert("Successfuly Delete");
      this.fetchPostsList();
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
                <th>Description</th>
                <th>User</th>
                <th colSpan="2"></th>
              </tr>
            </thead>
            <tbody>
              {all_posts.map(post => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>
                    <Link to={`/posts/${post.id}`}>
                      {post.title}
                    </Link>
                  </td>
                  <td>{post.description}</td>
                  <td>{post.user_id}</td>
                  
                  <td><Link to={"/posts/"+post.id+"/edit"} className="btn btn-primary">Edit</Link></td>
                  <td><button className="btn btn-danger" onClick={() => {if(window.confirm('Delete the item?')){this.handleDelete(post.id)};}}>Delete</button> </td>
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
