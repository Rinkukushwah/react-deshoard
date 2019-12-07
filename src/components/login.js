import React, { Component } from 'react';
import axios from 'axios';
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
          email: '',
          password: ''
      }

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

   onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onSubmit(event) {
    var email = this.state.email
    var password = this.state.password
    var user = {user: {email: email, password: password}}
    event.preventDefault();
    const headers = {
      'Content-Type': 'application/json'
    }
    axios.post(`http://localhost:3001/api/v1/sign_in`, user, {
    headers: headers
    })
    .then(user => {
      if (user.data.data.user) {
        var token = user.data.data.user.authentication_token
        localStorage.setItem('token', token);
        alert("Login successfully");
        window.location = "/users"
      }
      else{
        alert("Invalid email or password");
      } 
      // history.push("/users")
      // this.setState({
      //   all_users: result.data.data.user
      // });
    })
  }
  
  render() {
    return (
      <div style={{marginTop: 10}}>
        <h3>Login</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Email:  </label>
            <input value={this.state.email} onChange={this.onChangeEmail} type="email" className="form-control"/>
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input value={this.state.password} onChange={this.onChangePassword} type="password" className="form-control"/>
          </div>
          <div className="form-group">
            <input type="submit" value="Login" className="btn btn-primary"/>
          </div>
        </form>
      </div>
    )
  }
}