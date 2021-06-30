import React, { Component, Fragment } from 'react'
import { Button, Form, Col } from 'react-bootstrap'
import { Route, Link, Switch } from 'react-router-dom'
import { getAxiosInstance } from './Api'
import ToDoList from './Features/ToDoList'
import Tracker from './Features/Tracker'
import UserContext from '../UserContext'

export class Panel extends Component {

  static contextType = UserContext

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

    // check if logged in, then display features or prompt
    console.log(this.context)
    console.log(this.context.verified)

    if (this.context.verified) {
      console.log("verified 2")
      return (
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
      )
    } else {
      console.log("no verified 2")
      // prompt user to log in
      return (
        <Form className="gap-2">
          <Form.Group as={Col}>
            <Link to="/login"><Button className="w-100">Login</Button></Link>
          </Form.Group>
          <Form.Group as={Col}>
            <Link to="/register"><Button className="w-100">Register</Button></Link>
          </Form.Group>
        </Form>
      )
    }


  }
}

export default Panel