import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      all_users: []
    }
  }

  componentDidMount() {
    const headers = {
      'Content-Type': 'application/json',
      'User-Token': localStorage.token
    }
    axios.get(`http://localhost:3001/api/v1/users`, {
    headers: headers
    })
    .then(result => {
      this.setState({
        all_users: result.data.data.users
      });
    })
  } 
  render() {
    const { error, all_users} = this.state;

    if(error) {
      return (
        <div>Error: {error.message}</div>
      )
    } else {
      return(
        <div>
          <h2>Users List</h2>
          <table className="table">
            <thead>
              <tr>
                <th>#ID</th>
                <th>Email</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Address</th>
                <th>Country</th>
                <th>DOB</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {all_users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.address}</td>
                  <td>{user.country}</td>
                  <td><Moment format="DD-MM-YYYY" >{user.dob}</Moment></td>
                  <td><Link to={"/edit/"+user.id} className="btn btn-primary">Edit</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }
  }
}

export default Users;
