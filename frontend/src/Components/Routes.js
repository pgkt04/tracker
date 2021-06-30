import React, { Component, Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Panel from './Panel';
import { getUserInfo } from './Auth/Auth'
import { Button, Form, Col } from 'react-bootstrap'
import Navigation from './Navigation';
import { public_routes, private_routes } from '../routing';
import { UserContext } from '../UserContext';

export class Routes extends Component {

  constructor(props) {
    super(props)

    this.state = {
      verified: false,
      username: '',
    }

    this.updateVerified = this.updateVerified.bind(this);
    this.setVerified = this.setVerified.bind(this);
  }

  setVerified(status) {
    this.setState({
      verified: status
    });
  }

  async updateVerified() {
    try {
      let result = await getUserInfo()
      this.setState({
        verified: result.detail === 'success',
        username: result.username,
      });
    } catch (e) {
      this.setState({
        verified: false
      });
    }
  }

  async componentDidMount() {
    this.updateVerified()
  }

  render() {

    const routing = public_routes.map((route, index) => {
      return (route.component) ? (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          name={route.name}
          render={(props) => (
            <route.component {...props} />
          )}
        />
      ) : (null)
    })

    if (this.state.verified) {
      routing = private_routes.map((route, index) => {
        return (route.component) ? (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            name={route.name}
            render={(props) => (
              <route.component {...props} />
            )}
          />
        ) : (null)
      })
    }

    return (
      <div className="App">
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <UserContext.Provider value=
                {
                  this.state.verified,
                  this.updateVerified,
                  this.setVerified
                }>
                {routing}
              </UserContext.Provider>
            </Switch>
          </Suspense>
        </Router>
      </div>
    );


    if (this.state.verified) {
      return (
        <Router>
          <Navigation doRefresh={this.updateVerified} user={this.state.username} />
          <Panel onLogout={this.updateVerified} />
        </Router>
      )
    }

    return (
      <Router>
        <Navigation doRefresh={this.updateVerified} />
        <Route exact path="/">
          <Form className="gap-2">
            <Form.Group as={Col}>
              <Link to="/login"><Button className="w-100">Login</Button></Link>
            </Form.Group>
            <Form.Group as={Col}>
              <Link to="/register"><Button className="w-100">Register</Button></Link>
            </Form.Group>
          </Form>
        </Route>
        <Switch>
          <Route path="/login">
            <Login onLoginSuccess={this.updateVerified} />
          </Route>
          <Route path="/register">
            <Register onRegisterSuccess={this.updateVerified} />
          </Route>
        </Switch>
      </Router>
    )

  }
}

export default Routes
