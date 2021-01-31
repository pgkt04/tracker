import React, { Component, Fragment } from 'react'
import { Route, Link, Redirect, Switch } from 'react-router-dom'
import { getAxiosInstance } from './Api'
import ToDoList from './Features/ToDoList'
import Tracker from './Features/Tracker'

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
    localStorage.removeItem('token')
    this.setState({ isLoggedOut: true })
  }

  componentDidMount() {

  }

  render() {
    // return home once we logged out
    if (this.state.isLoggedOut) {
      return <Redirect to={{ pathname: '/', state: { update: true } }} />
    }
    console.log("hello???? please work")
    // display features
    return (
      <Fragment>
        <Route exact path="/panel">
          <button><Link to="/panel/tracker">Tracker</Link></button>
          <button><Link to="/panel/to-do">To-do List</Link></button>
          <button onClick={this.logoutUser}>Log out</button>
        </Route>
        <Switch>
          <Route path="/panel/tracker" component={Tracker} />
          <Route path="/panel/to-do" component={ToDoList} />
        </Switch>
      </Fragment>
    )
  }
}

export default Panel