import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Panel from './Panel';
import { isVerifiedAsync } from './Auth/Auth'

export class Routes extends Component {

    constructor(props) {
        super(props)

        this.state = {
            verified: false
        }
    }

    async componentDidMount() {
        try {
            let result = await isVerifiedAsync()
            console.log(result)
        } catch (e) {
        }
    }

    render() {
        let redir = this.state.verified ? <Redirect to="/panel" /> : null

        return (
            <Router>
                {redir}
                <Route exact path="/">
                    <button><Link to="/login">Login</Link></button>
                    <button><Link to="/register"> Register</Link></button>
                </Route>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/panel" component={Panel} />
                </Switch>
            </Router>
        )
    }
}

export default Routes
