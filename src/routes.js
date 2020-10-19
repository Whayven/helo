import React from "react";
import { Switch, Route } from "react-router-dom";
import Auth from "./Components/Auth/Auth";
import Dashboard from "./Components/Dashboard/Dashboard";
import Form from "./Components/Form/Form";
import Post from "./Components/Post/Post";
import EditPost from "./Components/EditPost/EditPost";

export default (
  <Switch>
    <Route component={Auth} exact path="/" />
    <Route component={Dashboard} path="/dashboard" />
    <Route component={Post} path="/post/:postid" />
    <Route component={Form} path="/new" />
    <Route component={EditPost} path="/edit/:postid" />
  </Switch>
);
