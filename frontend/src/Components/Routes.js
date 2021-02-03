import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Panel from './Panel';
import { isVerifiedAsync } from './Auth/Auth'
import { Button } from 'react-bootstrap'

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
                    <Link to="/login"><Button>Login</Button></Link>
                    <Link to="/register"><Button>Register</Button></Link>
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
