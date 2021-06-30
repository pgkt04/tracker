import React, { Component, Fragment } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Route, Link, Switch } from 'react-router-dom'
import { getAxiosInstance } from './Api'
import ToDoList from './Features/ToDoList'
import Tracker from './Features/Tracker'
import { UserContext } from '../UserContext'

export class Panel extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isLoggedOut: false,
      token: localStorage.getItem('token'),
    }

    this.api = getAxiosInstance(
      {
        headers: { 'Authorization': `token ${this.state.token}` }
      })

    this.logoutUser = this.logoutUser.bind(this)
  }

  logoutUser() {
    this.api.post('auth/logout/')
    localStorage.removeItem('token')
    this.setState((state, props) => {
      // check if we logged out, otherwise set verified state
      // this.props.onLogout()
      return { isLoggedOut: true }
    })
  }

  render() {
    // display features
    return (
      <Fragment>
        <Route exact path="/">
          <Form>
            <Form.Group>
              <Link to="/tracker">
                <Button className="w-100">Tracker</Button>
              </Link>
            </Form.Group>
            <Form.Group>
              <Link to="/to-do">
                <Button className="w-100">To-do List</Button>
              </Link>
            </Form.Group>
            <Form.Group>
              <Button className="w-100" onClick={this.logoutUser}>
                Log out
              </Button>
            </Form.Group>
          </Form>
        </Route>
      </Fragment>
    )
  }
}

export default Panel