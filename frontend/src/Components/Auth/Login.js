import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { api } from '../Api'
import { Form, Button, Row } from 'react-bootstrap'

export class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      loggged_in: false,
    }

    this.loginUser = this.loginUser.bind(this)
    this.usernameHandler = this.usernameHandler.bind(this)
    this.passwordHandler = this.passwordHandler.bind(this)
  }

  loginUser(e) {
    e.preventDefault()

    api.post('auth/login/',
      {
        'username': this.state.username,
        'password': this.state.password,
      })
      .then(response => {
        // read the token from the response and set it
        console.log(response)
        let token = response.data.token
        if (token) {
          localStorage.setItem('token', token)
          this.setState({ loggged_in: true })
        } else {
          alert('Invalid credentials or account not found')
        }
      })
      .catch(error => {
        console.log(error)
        alert('error has occured, please check the console')
      })

  }

  usernameHandler(e) {
    this.setState({
      username: e.target.value
    })
  }

  passwordHandler(e) {
    this.setState({
      password: e.target.value
    })
  }

  render() {

    if (this.state.loggged_in) {
      return <Redirect to={{
        pathname: '/panel',
        state: { update: true }
      }} />
    }

    return (
      <Form>
        <Form.Label>Login</Form.Label>
        <Form.Group as={Row} controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control onChange={this.usernameHandler} type="text" placeholder="username" />
        </Form.Group>
        <Form.Group as={Row} controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onChange={this.passwordHandler} type="password" placeholder="password" />
        </Form.Group>
        <Button onClick={this.loginUser} variant="primary" type="submit">
          Login
        </Button>
      </Form>
    )
  }
}

export default Login
