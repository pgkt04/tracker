import React, { Component } from 'react'

export class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }

        this.loginUser = this.loginUser.bind(this)
    }


    loginUser(e) {
        e.preventDefault()

    }

    render() {
        return (
            <div>
                <p>username</p>
                <input type="text" />
                <p>password</p>
                <input type="password" />
                <br />
                <button onClick={this.loginUser} type="submit">Submit</button>
            </div>
        )
    }
}

export default Login
