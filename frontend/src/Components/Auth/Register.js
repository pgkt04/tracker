import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { api } from '../Api'

export class Register extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
        }

        this.registerUser = this.registerUser.bind(this)
        this.usernameHandler = this.usernameHandler.bind(this)
        this.passwordHandler = this.passwordHandler.bind(this)
    }

    registerUser(e) {
        e.preventDefault()
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
        return (
            <form>
                <p>username</p>
                <input onChange={this.usernameHandler} value={this.state.username} type="text" />
                <p>password</p>
                <input onChange={this.passwordHandler} value={this.state.password} type="password" />
                <br />
                <button onClick={this.loginUser} type="submit">Submit</button>
            </form>
        )
    }
}

export default Register
