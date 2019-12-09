import React, { Component } from 'react';
import axios from 'axios';
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
          email: '',
          password: '',
          password_confirmation : ''
      }

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePasswordConfirmation = this.onChangePasswordConfirmation.bind(this);
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

  onChangePasswordConfirmation(e) {
    this.setState({
      password_confirmation: e.target.value
    });
  }

  onSubmit(event) {
    var email = this.state.email
    var password = this.state.password
    var password_confirmation = this.state.password_confirmation
    var user = {user: {email: email, password: password, password_confirmation: password_confirmation}}
    event.preventDefault();
    const headers = {
      'Content-Type': 'application/json'
    }
    axios.post(`http://localhost:3001/api/v1/sign_up`, user, {
    headers: headers
    })
    .then(user => {
      if (user.data.data.user) {
        // var token = user.data.data.user.authentication_token
        // localStorage.setItem('token', token);
        alert("Successfuly Signup");
        window.location = "/users"
      }
      else if (user.data.data.errors.email) {
        alert("email has already been taken");
      }
      else if (user.data.data.errors.password_confirmation) {
        alert("doesn't match Password");
      }
      else{
        alert("Something Went Wrong");
      } 
    })
  }
  render() {
    return (
      <div style={{marginTop: 10}}>
        <h3>Register</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Email:  </label>
            <input value={this.state.email} onChange={this.onChangeEmail}  type="email" className="form-control"/>
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input value={this.state.password} onChange={this.onChangePassword}  type="text" className="form-control"/>
          </div>
          <div className="form-group">
            <label>Re-enter Password: </label>
            <input value={this.state.password_confirmation} onChange={this.onChangePasswordConfirmation}  type="text" className="form-control"/>
          </div>
          <div className="form-group">
            <input type="submit" value="Register" className="btn btn-primary"/>
          </div>
        </form>
      </div>
    )
  }
}