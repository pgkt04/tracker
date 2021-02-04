import React, { Component } from 'react'
import { Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export class Navigation extends Component {
    render() {
        return (
            <Navbar variant="dark" fixed="top">
                <Link onClick={() => window.location.href = '/'}>Tracker</Link>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: <a href="#login">Username</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Navigation
