import React, { Component } from 'react'
import axios from 'axios'

export class Tracker extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    componentDidMount() {
        // fetch the user latest starting time
        axios.get("http://127.0.0.1:8000/latest-record/?format=json")
        .then(res => {
            console.log(res)
        })
        .catch(
            error => {
                console.log("something went wrong")
            }
        )
    }

    render() {
        return (
            <div>
                <p>Time elapsed: </p>
            </div>
        )
    }
}

export default Tracker
