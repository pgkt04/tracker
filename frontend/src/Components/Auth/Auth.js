import React, { Component } from 'react'
import { BrowserRouter, Redirect, Switch } from 'react-router-dom'
import { api } from '../Api'

export class Auth extends Component {

  /**
   * Check if the user has logged in and redirect them accordingly
   */


  constructor(props) {
    super(props)

    this.state = {
      verified: false
    }

  }

  componentDidMount() {
    // do an initial check and redirect if needed
    let token = localStorage.getItem('token')

    if (token) {
      api.post('auth/verify', {}, {
        headers: {
          'Authorization': `Token ${token}`
        }
      })
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    }

  }

  render() {
    
    if (this.state.verified) {
      return <Redirect to="panel/" />
    }

    return (
      <div>
        <BrowserRouter>
          <Switch>

          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default Auth
