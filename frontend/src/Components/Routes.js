import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
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
                    <Navigation />
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
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/panel" component={Panel} />
                </Switch>
            </Router>
        )
    }
}

export default Routes
