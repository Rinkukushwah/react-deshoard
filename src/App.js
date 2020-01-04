import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


import Edit from './components/edit.component';
import Index from './components/index.component';
import Login from './components/login';
import Register from './components/register';
import Users from './components/users';
import Updateprofile from './components/updateprofile'
import Posts from './components/posts/index';
import PostDetails from './components/posts/PostDetails';
import CreatePost from './components/posts/CreatePost';
import UpdatePost from './components/posts/UpdatePost';

class App extends Component {
  Logout() {
    localStorage.clear();
    window.location = "/login"
    alert("Logout successfully");
  }
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link from="/" to={'/index'} className="navbar-brand">Home</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                { localStorage.token &&
                  
                  <li className="nav-item">
                    <button onClick={this.Logout} className="nav-link" style={{border: "none", background: "transparent", cursor: "pointer"}}>Logout</button>
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
                { localStorage.token &&
                  
                  <li className="nav-item">
                  <Link to={'/profile'} className="nav-link">Profile</Link>
                </li>
                }
                { localStorage.token &&
                  
                  <li className="nav-item">
                  <Link to={'/posts'} className="nav-link">Posts</Link>
                </li>
                }
              </ul>
            </div>
          </nav> <br/>
          <Switch>
              <Route exact path='/login' component={ Login } />
              <Route exact path='/register' component={ Register } />
              <Route path='/edit/:id' component={ Edit } />
              <Route path='/index' component={ Index } />
              <Route path='/users' component={ Users } />
              <Route path='/profile' component={ Updateprofile } />
              <Route
                path="/posts/new"
                exact
                component={CreatePost}
               />
              <Route
                path="/posts/:id"
                exact
                component={PostDetails}
               />
              <Route
                path="/posts/:id/edit"
                exact
                component={UpdatePost}
               />
               <Route
                path="/posts"
                exact
                component={Posts}
               />
          </Switch>
        </div>
      </Router>
    );
  }
}


export default App;
