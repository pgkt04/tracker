import React, { Component } from 'react'
import Tracker from './Tracker'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import ToDoList from './ToDoList'

export class Panel extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/">
                            <button><Link to="/tracker">Tracker</Link></button>
                            <button><Link to="/to-do">To-do List</Link></button>
                        </Route>
                        <Route path="/tracker">
                            <Tracker />
                        </Route>
                        <Route path="/to-do">
                            <ToDoList />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default Panel
