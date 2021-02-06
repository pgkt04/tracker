import React, { Component, Fragment } from 'react'
import { Navbar, Button } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'

export class Navigation extends Component {

    render() {

        let displayUser = this.props.user ?
            <Fragment>{"Signed in as "}<a>{this.props.user}</a></Fragment>
            : null

        return (
            <Navbar variant="dark" fixed="top">
                <a href="#" onClick={() => { window.location.href = "/" }}>Tracker</a>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        {displayUser}
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Navigation
