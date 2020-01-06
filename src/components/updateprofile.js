import React, { Component } from 'react';
import axios from 'axios';
import ImageUploader from 'react-images-upload';
import DatePicker from "react-date-picker";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
          email: '',
          password: '',
          password_confirmation : '',
          first_name: '',
          last_name: '',
          image: [],
          phone: '',
          country: '',
          dob: '',
          selectedDay: undefined,
          address: ''
      }

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleDayChange(selectedDay){
    this.setState({
        selectedDay
    });
  } 
  onDrop(picture) {
      this.setState({
          pictures: this.state.pictures.concat(picture),
      });
  }

  onChangeHandler(e) {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }
  
  componentDidMount(){
    const headers = {
      'Content-Type': 'application/json',
      'User-Token': localStorage.token
    }

    axios.get(`http://localhost:3001/api/v1/profile`, {headers: headers})
    .then(user=>{
      this.setState({first_name: user.data.first_name, last_name: user.data.last_name, phone: user.data.phone, country: user.data.country, email: user.data.email, image: user.data.image.url, address: user.data.address, dob: user.data.dob});
    })
    .catch(function(error){
      console.log(error);
    })
  }

  onSubmit(event) {
    var dateAbc = `${this.state.selectedDay.getFullYear()}-${this.state.selectedDay.getMonth() + 1}-${this.state.selectedDay.getDate()}`;
        console.log(dateAbc);
    var user = {
          email: this.state.email,
          password: this.state.password, 
          password_confirmation: this.state.password_confirmation, 
          first_name: this.state.first_name, 
          last_name: this.state.last_name, 
          image: this.state.image, 
          phone: this.state.phone, 
          country: this.state.country,
          dob: dateAbc
     }
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
    const {selectedDay} = this.state;

    return (
      
      <div style={{marginTop: 10}}>
        <h3>Profile</h3>

        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>First Name:  </label>
            <input name="first_name" value={this.state.first_name} onChange={this.onChangeHandler}  type="text" className="form-control"/>
          </div>
          <div className="form-group">
            <DayPickerInput name="dob" inputProps={{ className: 'form-control' }} onDayChange={this.handleDayChange}  value={this.state.dob} placeholder='Enter date' />
          </div>
          <div className="form-group">
            <label>Last Name:  </label>
            <input name="last_name" value={this.state.last_name} onChange={this.onChangeHandler}  type="text" className="form-control"/>
          </div>
          <div className="form-group">
            <label>image: </label>
            <input name="image" value={this.state.image} onChange={this.onChangeHandler}  type="file"/>
          </div>
          <div className="form-group">
            <label>Phone: </label>
            <input name="phone" value={this.state.phone} onChange={this.onChangeHandler}  type="text" className="form-control"/>
          </div>
          <div className="form-group">
            <label>Country: </label>
            <input name="country" value={this.state.country} onChange={this.onChangeHandler}  type="text" className="form-control"/>
          </div>
          <div className="form-group">
            <label>Email:  </label>
            <input name="email" value={this.state.email} onChange={this.onChangeHandler}  type="email" className="form-control"/>
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input name="password" value={this.state.password} onChange={this.onChangeHandler}  type="password" className="form-control"/>
          </div>
          <div className="form-group">
            <label>Re-enter Password: </label>
            <input name="password_confirmation" value={this.state.password_confirmation} onChange={this.onChangeHandler}  type="password" className="form-control"/>
          </div>
          <div className="form-group">
            <input type="submit" value="Register" className="btn btn-primary"/>
          </div>
        </form>
      </div>
    )
  }
}