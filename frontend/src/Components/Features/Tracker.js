import React, { Component, Fragment } from 'react'
import { Button, Col, Row, Form } from 'react-bootstrap'
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';
import { Redirect } from 'react-router-dom'
import { auth_api as api } from '../Api'

export class Tracker extends Component {

  constructor(props) {
    super(props);

    this.state = {
      topic: '',
      record_data: {},
      delta_time: [],
      topics: [],
      has_loaded: false,
      redirect_back: false,
    };

    this.resetTimer = this.resetTimer.bind(this);
    this.redirectBack = this.redirectBack.bind(this);
    this.topicHandler = this.topicHandler.bind(this);
    this.addTopic = this.addTopic.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.updateRecords = this.updateRecords(this);
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

  resetTimer() {
    api.get("reset-records/")
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

  topicHandler(e) {
    this.setState({
      topic: e.target.value
    })
  }

  updateRecords() {
    // fetch the user latest starting time
    // and calculate their delta time
    //
    api.get("get-records/")
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
  }

  // id is the id of the record we want to delete
  //
  deleteHandler(e, id) {
    e.preventDefault();

    api.post('delete-record/', { 'id': id })
      .then(response => { })
      .catch(error => { });

    this.updateRecords();
  }

  addTopic(e) {
    e.preventDefault();
    api.post('add-record/', { 'topic': this.state.topic })
      .then(response => {
        try {
          let api_data = this.state.record_data;
          api_data.push(response.data);
          this.setState({
            record_data: api_data,
            delta_time: this.calcDeltaTime(api_data)
          });
        } catch (e) { }
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  componentDidMount() {
    let current_time = Math.round(Date.now() / 1000)

    this.updateRecords();

    // update the timer every second
    //
    this.updateTimer = setInterval(() => {
      current_time = Math.round(Date.now() / 1000);
      this.setState({
        delta_time: this.calcDeltaTime(this.state.record_data),
        has_loaded: true
      });

    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.updateTimer);
  }

  render() {
    // handler to go back to the previous page
    //
    if (this.state.redirect_back) {
      return <Redirect to="/" />
    }

    // TODO: add functionality for resetting stuff
    //
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
      let record_id = this.state.record_data[key].id;

      return dt ? (
        <Fragment key={key}>
          <Row><Col>
            {dayDisplay} {hDisplay} {mDisplay} {sDisplay} {topic} { }
            <Button onClick={(e) => { this.deleteHandler(e, record_id) }}>
              Delete
            </Button>
          </Col></Row>
        </Fragment>) : (null);
    });

    return (
      <Fragment>
        <Row className="g-2">
          {display_all}
        </Row>

        <Row className="track-width mb-4">
          <Col><Button block onClick={this.redirectBack}>Back</Button></Col>
          <Col><Button block onClick={this.resetTimer}>Reset all</Button></Col>
        </Row>

        <Form>
          <Form.Label>New Tracker</Form.Label>
          <Row className="mb-3">
            <Form.Group as={Col} xs={8}>
              <Form.Control onChange={this.topicHandler} className="w-100" type="text" placeholder="topic" />
            </Form.Group>
            <Form.Group as={Col} xs={4}>
              <Button onClick={this.addTopic} style={{ float: "left" }} type="submit">Create</Button>
            </Form.Group>
          </Row>
        </Form>

      </Fragment >
    )
  }
}

export default Tracker