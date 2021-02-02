import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { api } from '../Api'

export class Register extends Component {

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
                        this.setState({ registered: true })
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
            return <Redirect to={{
                pathname: '/login',
                state: { update: true }
            }} />
        }


        return (
            <form>
                <p>username</p>
                <input onChange={this.usernameHandler} value={this.state.username} type="text" />
                <p>password</p>
                <input onChange={this.passwordHandler} value={this.state.password} type="password" />
                <br />
                <button onClick={this.registerUser} type="submit">Submit</button>
            </form>
        )
    }
}

export default Register
