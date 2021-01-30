import React, { Component, Fragment } from 'react'
import { Route, Link, Redirect, BrowserRouter, Switch } from 'react-router-dom'
import ToDoList from './Features/ToDoList'
import Tracker from './Features/Tracker'
import { getAxiosInstance } from './Api'

export class Panel extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isLoggedOut: false,
      token: localStorage.getItem('token'),
    }

    this.api = getAxiosInstance({ headers: { 'Authorization': `token ${this.state.token}` } })
    this.logoutUser = this.logoutUser.bind(this)
  }

  logoutUser() {
    this.api.post('auth/logout/')
    this.setState({ isLoggedOut: true })
  }

  render() {
    // return home once we logged out
    if (this.state.isLoggedOut) {
      return <Redirect to={{ pathname: '/', state: { update: true } }} />
    }

    // display features
    return (
      <Fragment>
        <Route exact path="/panel">
          <button><Link to="/tracker">Tracker</Link></button>
          <button><Link to="/to-do">To-do List</Link></button>
          <button onClick={this.logoutUser}>Log out</button>
        </Route>
        <Route path="/tracker" component={Tracker} />
        <Route path="/to-do" component={ToDoList} />
      </Fragment>
    )
  }
}

export default Panel