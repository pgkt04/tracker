import React, { Component } from 'react'
import { api } from '../Api'

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
                    this.setState({ loggged_in: true })
                    localStorage.setItem('token', token)
                } else {
                    alert('Invalid credentials or account not found')
                }
            })
            .catch(error => {
                console.log(error)
                alert('error has occured, please check the console')
            })

        // redirect if successful
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

export default Login
