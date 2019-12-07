import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import  PrivateRoute from './PrivateRoute';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


import Edit from './components/edit.component';
import Index from './components/index.component';
import Login from './components/login';
import Register from './components/register';
import Users from './components/users';


class App extends Component {
  Logout() {
    localStorage.clear();
    window.location = "/login"
    alert("Logout successfully");
  }
  render() {
    // const isLoggedIn = (localStorage.token);
    // let button;
    // if (isLoggedIn) {
    //   button = <Users onClick={this.handleLogoutClick} />;
    // } else {
    //   button = <Login onClick={this.handleLoginClick} />;
    // }

    // debugger
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/'} className="navbar-brand">Home</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                { localStorage.token &&
                  
                  <li className="nav-item">
                    <Link onClick={this.Logout} className="nav-link">Logout</Link>
                  </li>
                }
                { localStorage.token &&
                  
                  <li className="nav-item">
                  <Link to={'/users'} className="nav-link">User List</Link>
                </li>
                }
                { !localStorage.token &&
                  
                  <li className="nav-item">
                    <Link to={'/login'} className="nav-link">Login</Link>
                  </li>
                }
                { !localStorage.token &&
                  <li className="nav-item">
                    <Link to={'/register'} className="nav-link">Register</Link>
                  </li>
                }
                              
                <li className="nav-item">
                  <Link to={'/index'} className="nav-link">Index</Link>
                </li>
                
                
              </ul>
            </div>
          </nav> <br/>
          <Switch>
              <Route exact path='/login' component={ Login } />
              <Route exact path='/register' component={ Register } />
              <Route path='/edit/:id' component={ Edit } />
              <Route path='/index' component={ Index } />
              <Route path='/users' component={ Users } />
          </Switch>
        </div>
      </Router>
    );
  }
}


export default App;
