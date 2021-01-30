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
    }

    this.doUpdate = this.doUpdate.bind(this)
  }

  doUpdate() {
    console.log('performing update')
    let token = localStorage.getItem('token')
    let api = getAxiosInstance({ headers: { 'Authorization': `token ${token}` } })
    if (token) {
      api.post('auth/verify/')
        .then(response => {
          console.log(response)
          this.setState({ verified: (response.data.detail === 'success') })
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  componentDidMount() {
    this.doUpdate()
  }

  componentDidUpdate() {
    try {
      if (this.props.location.state.update) {
        console.log(localStorage.getItem('token'))
        this.doUpdate()
        console.log('update finished')
        this.props.location.state.update = false;
      }
    } catch (e) {
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
