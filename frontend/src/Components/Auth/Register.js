import React, { Component } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import UserContext from '../../UserContext'
import { api } from '../Api'

export class Register extends Component {

  static contextType = UserContext

  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      registered: false,
    }

    this.registerUser = this.registerUser.bind(this)
    this.usernameHandler = this.usernameHandler.bind(this)
    this.passwordHandler = this.passwordHandler.bind(this)
  }

  registerUser(e) {
    e.preventDefault()

    api.post('auth/register/',
      {
        'username': this.state.username,
        'password': this.state.password,
      })

      .then(response => {
        // read the token from the response and set it
        console.log(response)
        try {
          if (response.data.detail === 'success') {
            this.setState({ registered: true });
            this.context.updateVerified();
          }
        } catch (e) {
          // pass
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

    if (this.state.registered) {
      return <Redirect to="/" />
    }

    return (
      <Form>
        <Form.Label>Register</Form.Label>
        <Form.Group as={Row} controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control onChange={this.usernameHandler} type="text" placeholder="username" />
        </Form.Group>
        <Form.Group as={Row} controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onChange={this.passwordHandler} type="password" placeholder="password" />
        </Form.Group>
        <Button onClick={this.registerUser} variant="primary" type="submit">
          Register
        </Button>
      </Form>
    )
  }
}

export default Register
