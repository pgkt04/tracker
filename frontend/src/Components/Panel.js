import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import ToDoList from './Features/ToDoList'
import Auth from './Auth/Auth'
import Tracker from './Features/Tracker'

export class Panel extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Auth />
            </Route>
            <Route path="/panel">
              <button><Link to="/tracker">Tracker</Link></button>
              <button><Link to="/to-do">To-do List</Link></button>
            </Route>
            <Route path="/tracker">
              <Tracker />
            </Route>
            <Route path="/to-do">
              <ToDoList />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default Panel