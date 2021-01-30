import React, { Component, Fragment } from 'react'
import { Link, Redirect, Route } from 'react-router-dom'
import { getAxiosInstance } from '../Api'
import Panel from '../Panel'
import Login from './Login'
import Register from './Register'

export class Auth extends Component {

  /**
   * Check if the user has logged in and redirect them accordingly
   */


  constructor(props) {
    super(props)

    this.state = {
      verified: false,
      force_refresh: false,
      token: localStorage.getItem('token'),
    }

    this.api = getAxiosInstance({ headers: { 'Authorization': `token ${this.state.token}` } })
  }

  componentDidMount() {
    // do an initial check and redirect if needed

    // refresh the token
    this.setState({ 'token': localStorage.getItem('token') })

    if (this.state.token) {
      this.api.post('auth/verify/')
        .then(response => {
          console.log(response)
          if (response.data.detail === 'success') {
            this.setState({ verified: true })
          }
        })
        .catch(error => {
          console.log(error)
        })
    }

  }

  render() {
    if (this.state.verified) {
      return (
        <Fragment>
          <Redirect to="/panel/" />
          <Panel />
        </Fragment>
      )
    }
    return (
      <Fragment>
        <Route exact path="/">
          <button><Link to="/login">Login</Link></button>
          <button><Link to="/register">Register</Link></button>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Fragment>
    )
  }
}

export default Auth
