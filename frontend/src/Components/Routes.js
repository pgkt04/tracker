import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import Login from './Auth/Login';
import Register from './Auth/Register';
import ToDoList from './Features/ToDoList';
import Tracker from './Features/Tracker';
import Panel from './Panel';
import { isVerified } from './Auth/Auth'

export class Routes extends Component {

    constructor(props) {
        super(props)

        this.state = {
            verified: false
        }
    }

    componentDidMount() {
        try {
            isVerified().then(response => {
                this.setState({ verified: response.detail === 'success' })
            })
        } catch (e) {
        }
    }

    render() {
        console.log(this.state.verified)
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
                    <Route path="/tracker" component={Tracker} />
                    <Route path="/to-do" component={ToDoList} />
                </Switch>
            </Router>
        )
    }
}

export default Routes
