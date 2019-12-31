// app/javascript/routes.js
import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import Posts from './components/posts/index';
import PostDetails from './components/posts/PostDetails';
import CreatePost from './components/posts/CreatePost';
import UpdatePost from './components/posts/UpdatePost';

export default () => {
  return (
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
  );
}
