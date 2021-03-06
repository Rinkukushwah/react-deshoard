// app/javascript/routes.js
import React, { Component } from 'react';
import { BrowserRouter as Switch, Route,} from 'react-router-dom';
import Posts from './components/posts/index';
import PostDetails from './components/posts/PostDetails';
import CreatePost from './components/posts/CreatePost';
import UpdatePost from './components/posts/UpdatePost';

export default class Routes extends Component {
  return (){
    <Switch>
      <Route exact path="/">
        <Posts />
      </Route>
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
    </Switch>
  }
}
