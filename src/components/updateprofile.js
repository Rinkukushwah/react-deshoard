import React, { Component } from 'react';
import axios from 'axios';
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
          email: '',
          password: '',
          password_confirmation : '',
          first_name: '',
          last_name: '',
          image: '',
          phone: '',
          country: ''
      }

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePasswordConfirmation = this.onChangePasswordConfirmation.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeCountry = this.onChangeCountry.bind(this);
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
  onChangeFirstName(e) {
    this.setState({
      first_name: e.target.value
    });
  }

  onChangeLastName(e) {
    this.setState({
      last_name: e.target.value
    });
  }

  onChangeImage(e) {
    this.setState({
      image: e.target.value
    });
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value
    });
  }

  onChangeCountry(e) {
    this.setState({
      country: e.target.value
    });
  }

  onSubmit(event) {
    var email = this.state.email
    var password = this.state.password
    var password_confirmation = this.state.password_confirmation
    var first_name = this.state.first_name
    var last_name = this.state.last_name
    var image = this.state.image
    var phone = this.state.phone
    var country = this.state.country
    var user = {email: email, password: password, password_confirmation: password_confirmation, first_name: first_name, last_name: last_name, image: image, phone: phone, country: country}
    event.preventDefault();
    const headers = {
      'Content-Type': 'application/json',
      'User-Token': localStorage.token
    }
    axios.post(`http://localhost:3001/api/v1/update_account`, user, {
    headers: headers
    })
    .then(user => {
      if (user.data.data.user) {
        // var token = user.data.data.user.authentication_token
        // localStorage.setItem('token', token);
        alert("Successfuly Update");
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
      // history.push("/users")
      // this.setState({
      //   all_users: result.data.data.user
      // });
    })
  }
  render() {
    return (
      <div style={{marginTop: 10}}>
        <h3>Profile</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>First Name:  </label>
            <input value={this.state.first_name} onChange={this.onChangeFirstName}  type="text" className="form-control"/>
          </div>
          <div className="form-group">
            <label>Last Name:  </label>
            <input value={this.state.last_name} onChange={this.onChangeLastName}  type="text" className="form-control"/>
          </div>
          <div className="form-group">
            <label>image: </label>
            <input value={this.state.image} onChange={this.onChangeImage}  type="file"/>
          </div>
          <div className="form-group">
            <label>Phone: </label>
            <input value={this.state.phone} onChange={this.onChangePhone}  type="text" className="form-control"/>
          </div>
          <div className="form-group">
            <label>Country: </label>
            <input value={this.state.country} onChange={this.onChangeCountry}  type="text" className="form-control"/>
          </div>
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