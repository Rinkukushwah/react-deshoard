import React, { Component } from 'react';

export default class Register extends Component {
  render() {
    return (
      <div style={{marginTop: 10}}>
        <h3>Register</h3>
        <form>
          <div className="form-group">
            <label>Email:  </label>
            <input type="text" className="form-control"/>
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input type="text" className="form-control"/>
          </div>
          <div className="form-group">
            <label>Re-enter Password: </label>
            <input type="text" className="form-control"/>
          </div>
          <div className="form-group">
            <input type="submit" value="Register" className="btn btn-primary"/>
          </div>
        </form>
      </div>
    )
  }
}