import React, { Component, Fragment } from 'react'
import { Button, Col, Row, Form } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { getAxiosInstance } from '../Api'

export class Tracker extends Component {

  constructor(props) {
    super(props);

    this.state = {
      record_data: {},
      delta_time: [],
      topics: [],
      has_loaded: false,
      token: localStorage.getItem('token'),
      redirect_back: false,
    };

    this.resetTimer = this.resetTimer.bind(this);
    this.redirectBack = this.redirectBack.bind(this);
    this.api = getAxiosInstance(
      { headers: { 'Authorization': `token ${this.state.token}` } }
    );
  }

  // calculates a list of delta time
  //
  calcDeltaTime(data) {
    let ret = [];
    let current_time = Math.round(Date.now() / 1000);
    for (let i = 0; i < data.length; i++) {
      ret.push(current_time - data[i].created);
    }
    return ret;
  }

  componentDidMount() {
    let current_time = Math.round(Date.now() / 1000)

    // fetch the user latest starting time
    // and calculate their delta time
    //
    this.api.get("get-records/")
      .then(res => {
        this.setState({
          record_data: res.data,
          delta_time: this.calcDeltaTime(res),
          has_loaded: true
        })
      })
      .catch(
        error => {
          console.log("something went wrong" + error)
        }
      );

    this.updateTimer = setInterval(() => {
      current_time = Math.round(Date.now() / 1000);
      this.setState(
        {
          delta_time: this.calcDeltaTime(this.state.record_data),
          // deprecated:
          // current_time - this.state.record_data.created,
          has_loaded: true
        });

      console.log(this.state.delta_time);
    }, 1000);

  }

  componentWillUnmount() {
    clearInterval(this.updateTimer);
  }

  resetTimer() {
    this.api.get("reset-record/")
      .then(res => {
        this.setState({ record_data: res.data })
      })
      .catch(error => {
        console.log("failed to reset" + error)
      });
  }

  redirectBack() {
    this.setState({ redirect_back: true })
  }

  render() {
    // handler to go back to the previous page
    //
    if (this.state.redirect_back) {
      return <Redirect to="/" />
    }

    // let msg = this.state.has_loaded ? this.state.delta_time : "loading"
    let display_all = this.state.delta_time.map((dt, key) => {
      let delta = Number(dt);
      let hours = Math.floor(delta / 3600);
      let minutes = Math.floor(delta % 3600 / 60);
      let seconds = Math.floor(delta % 3600 % 60);
      let days = Math.floor(hours / 24);
      let remainingHrs = hours - (days * 24);
      let dayDisplay = days > 0 ? days + (days === 1 ? " day " : " days ") : "";
      let hDisplay = remainingHrs > 0 ? remainingHrs + (remainingHrs === 1 ? " hour " : " hours ") : "";
      let mDisplay = minutes > 0 ? minutes + (minutes === 1 ? " minute " : " minutes ") : "";
      let sDisplay = seconds > 1 ? seconds + (seconds === 1 ? " second" : " seconds") : "";
      let topic = this.state.record_data[key].topic;
      return dt ? (<p>{dayDisplay} {hDisplay} {mDisplay} {sDisplay} {topic}</p>) : (null);
    });

    return (
      <Fragment>
        <Row className="g-2">
          {display_all}
        </Row>

        <Row className="track-width mb-4">
          <Col><Button block onClick={this.redirectBack}>Back</Button></Col>
          <Col><Button block onClick={this.resetTimer}>Reset</Button></Col>
        </Row>

        <Form>
          <Form.Label>New Tracker</Form.Label>
          <Row className="mb-3">
            <Form.Group as={Col} xs={8}>
              <Form.Control className="w-100" type="text" placeholder="topic" />
            </Form.Group>
            <Form.Group as={Col} xs={4}>
              <Button style={{ float: "left" }} type="submit">Create</Button>
            </Form.Group>
          </Row>
        </Form>

      </Fragment >
    )
  }
}

export default Tracker
