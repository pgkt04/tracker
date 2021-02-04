import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Panel from './Panel';
import { isVerifiedAsync } from './Auth/Auth'
import { Button, Form } from 'react-bootstrap'
import Navigation from './Navigation';

export class Routes extends Component {

    constructor(props) {
        super(props)

        this.state = {
            verified: false,
            username: '',
        }

        this.updateVerified = this.updateVerified.bind(this)
    }

    async updateVerified() {
        try {
            let result = await isVerifiedAsync()
            this.setState({ verified: result })
        } catch (e) {
        }
    }

    async componentDidMount() {
        console.log('component mounted')
        this.updateVerified()
    }

    render() {

        if (this.state.verified) {
            return (
                <Router>
                    <Navigation />
                    <Panel />
                </Router>
            )
        }

        return (
            <Router>
                <Navigation />
                <Route exact path="/">
                    <Form>
                        <Form.Group>
                            <Link to="/login"><Button block>Login</Button></Link>
                        </Form.Group>
                        <Form.Group>
                            <Link to="/register"><Button block>Register</Button></Link>
                        </Form.Group>
                    </Form>
                </Route>
                <Switch>
                    <Route path="/login">
                        <Login onLoginSuccess={this.updateVerified} />
                    </Route>
                    <Route path="/register" component={Register} />
                </Switch>
            </Router>
        )
    }
}

export default Routes
