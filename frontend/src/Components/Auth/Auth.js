import React, { Component } from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import { api } from '../Api'

export class Auth extends Component {

  /**
   * Check if the user has logged in and redirect them accordingly
   */


  constructor(props) {
    super(props)

    this.state = {
    }

  }

  componentDidMount() {
    // do an initial check and redirect if needed
    let token = localStorage.getItem('bearer')
    
    if (token) {
      // verify
      api.post()
    }


  }

  render() {
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
