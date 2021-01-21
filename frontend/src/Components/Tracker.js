import React, { Component } from 'react'
import axios from 'axios'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Tracker2 from './Tracker2'

export class Tracker extends Component {

    constructor(props) {
        super(props)

        this.state = {
            record_data: {},
            delta_time: 0
        }

        this.resetTimer = this.resetTimer.bind(this)
    }

    componentDidMount() {
        // fetch the user latest starting time
        axios.get("http://127.0.0.1:8000/latest-record/?format=json")
            .then(res => {
                console.log(res)
                this.setState({ record_data: res.data })
            })
            .catch(
                error => {
                    console.log("something went wrong")
                }
            )

        this.updateTimer = setInterval(() => {
            let current_time = Math.round(Date.now() / 1000)
            console.log("created: " + this.state.record_data.created)
            console.log("current time: " + current_time)
            this.setState({
                delta_time: current_time - this.state.record_data.created
            })
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.updateTimer)
    }

    resetTimer() {
        axios.get("http://127.0.0.1:8000/reset-record")
            .then(res => {
                this.setState({ record_data: res.data })
            })
            .catch(error => {
                console.log("failed to reset" + error)
            })
    }

    render() {
        return (
            <div>
                <p>Time elapsed: {this.state.delta_time}</p>
                <button onClick={this.resetTimer}>Reset</button>
                <BrowserRouter>
                    <Switch>
                        <Route path="/test">
                            <Tracker2 />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default Tracker
