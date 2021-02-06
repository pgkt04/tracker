import React, { Component, Fragment } from 'react'
import { Button, Form } from 'react-bootstrap'
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
    this.setState((state, props) => {
      this.props.onLogout()
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
              <Link to="/tracker"><Button block>Tracker</Button></Link>
            </Form.Group>
            <Form.Group>
              <Link to="/to-do"><Button block>To-do List</Button></Link>
            </Form.Group>
            <Form.Group>
              <Button block onClick={this.logoutUser}>Log out</Button>
            </Form.Group>
          </Form>
        </Route>
        <Switch>
          <Route path="/tracker" component={Tracker} />
          <Route path="/to-do" component={ToDoList} />
        </Switch>
      </Fragment>
    )
  }
}

export default Panel