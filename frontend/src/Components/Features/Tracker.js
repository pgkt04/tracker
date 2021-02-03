import React, { Component } from 'react'
import { getAxiosInstance } from '../Api'

export class Tracker extends Component {

  constructor(props) {
    super(props)

    this.state = {
      record_data: {},
      delta_time: 0,
      has_loaded: false,
      token: localStorage.getItem('token'),
    }

    this.resetTimer = this.resetTimer.bind(this)
    this.api = getAxiosInstance({ headers: { 'Authorization': `token ${this.state.token}` } })
  }

  componentDidMount() {
    let current_time = Math.round(Date.now() / 1000)
    // fetch the user latest starting time

    this.api.get("latest-record/")
      .then(res => {
        this.setState({
          record_data: res.data,
          delta_time: current_time - res.data.created,
          has_loaded: true
        })
      })
      .catch(
        error => {
          console.log("something went wrong" + error)
        }
      )

    this.updateTimer = setInterval(() => {
      current_time = Math.round(Date.now() / 1000)
      this.setState({
        delta_time: current_time - this.state.record_data.created,
        has_loaded: true
      })
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.updateTimer)
  }

  resetTimer() {
    this.api.get("reset-record/")
      .then(res => {
        this.setState({ record_data: res.data })
      })
      .catch(error => {
        console.log("failed to reset" + error)
      })
  }

  render() {
    let msg = this.state.has_loaded ? this.state.delta_time : "loading"
    let delta = Number(this.state.delta_time)
    let hours = Math.floor(delta / 3600);
    let minutes = Math.floor(delta % 3600 / 60);
    let seconds = Math.floor(delta % 3600 % 60);
    let days = Math.floor(hours / 24)
    let remainingHrs = hours - (days * 24)
    let dayDisplay = days > 0 ? days + (days === 1 ? " day, " : " days, ") : "";
    let hDisplay = remainingHrs > 0 ? remainingHrs + (remainingHrs === 1 ? " hour, " : " hours, ") : "";
    let mDisplay = minutes > 0 ? minutes + (minutes === 1 ? " minute, " : " minutes, ") : "";
    let sDisplay = seconds > 0 ? seconds + (seconds === 1 ? " second" : " seconds") : "";

    return (
      <div>
        <p>Time elapsed: {msg}</p>
        <p>{dayDisplay} {hDisplay} {mDisplay} {sDisplay}</p>
        <button onClick={this.resetTimer}>Reset</button>
      </div>
    )
  }
}

export default Tracker
