import React from 'react';
import axios from 'axios';
//import './index.js';
import * as firebase from 'firebase';
import ReactTable from 'react-table';
import classes from 'react-table/react-table.css'

class Timetable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            results: [],
            busStopNumber: '312',
            route: '',
            destination: '',
            oirigin: '',
            duetime: '',
            speed: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.startTimer = this.startTimer.bind(this);
    }

    handleChange() {
        //this.setState({ busStopNumber: event.target.value });

        this.setState({busStopNumber : document.getElementById('stopNum').value});

    }

    startTimer(event){
        event.preventDefault();
        this.handleSubmit();
        setInterval(this.handleSubmit, 10000);
    }

    handleSubmit() {

        axios.get(`https://data.dublinked.ie/cgi-bin/rtpi/realtimebusinformation?stopid=${this.state.busStopNumber}&format=json`)
            .then(res => {
                console.log("refreshing times");
                //Make it read from Database instead of setting state
                const results = res.data.results;
                //this.setState({ results: results });
                const stopRef = firebase.database().ref().child(this.state.busStopNumber);
                for (var i = 0; i < results.length; i++) {
                    stopRef.child(i).child("duetime").set(results[i].duetime);
                    stopRef.child(i).child("route").set(results[i].route);
                    stopRef.child(i).child("destination").set(results[i].destination);
                    stopRef.child(i).child("origin").set(results[i].origin);
                }
            })
            .then(this.displayTimes());
    }

    displayTimes(){
        //setTimeout(() => {
        const stopRef = firebase.database().ref().child(this.state.busStopNumber);
        stopRef.on('value', snapshot =>{
            this.setState({results: snapshot.val()});
        });
        //}, 600);
    }


    render() {
        const columns = [{
            Header: 'Route',
            accessor: 'route' // String-based value accessors!
        },
            {
                Header: 'Origin',
                accessor: 'origin' // String-based value accessors!
            },
            {
                Header: 'Destination',
                accessor: 'destination' // String-based value accessors!
            },
            {
                Header: 'Due In (Minutes)',
                accessor: 'duetime' // String-based value accessors!
            }];
        return (
            <div>
                <form onSubmit={this.startTimer}>
                    <label>
                        Bus Stop Number:
                        <input id="stopNum" type="text" />
                    </label>
                    <input type="submit" value="Go" onClick={this.handleChange}/>
                </form>
                <ReactTable
                    data={this.state.results}
                    columns={columns}
                    className={classes.ReactTable}
                />
            </div>
        );
    }
}

export default Timetable;