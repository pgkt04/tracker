import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './Auth/Login';
import Register from './Auth/Register';
import ToDoList from './Features/ToDoList';
import Tracker from './Features/Tracker';
import Panel from './Panel';

export class Routes extends Component {
    render() {
        return (
            <Router>
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
