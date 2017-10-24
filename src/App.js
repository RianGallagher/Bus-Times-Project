import React from 'react';
import axios from 'axios';
import './index.js';
import * as firebase from 'firebase';
import ReactTable from 'react-table';
import 'react-table/react-table.css'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      busStopNumber: '',
      route: '',
      destination: '',
      oirigin: '',
      duetime: '',
      speed: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ busStopNumber: event.target.value });
  }
  //this.replaceState{(results: '')};
  handleSubmit(event) {
    const results = [];
    axios.get(`https://data.dublinked.ie/cgi-bin/rtpi/realtimebusinformation?stopid=${this.state.busStopNumber}&format=json`)
    .then(res => {

      //Make it read from Database instead of setting state
      const results = res.data.results
      this.setState({ results: results });
        const rootRef = firebase.database().ref();
        for(var i =0; i<this.state.results.length; i++){
            rootRef.child(this.state.busStopNumber).child(i).child("duetime").set(this.state.results[i].duetime);
            rootRef.child(this.state.busStopNumber).child(i).child("route").set(this.state.results[i].route);
            rootRef.child(this.state.busStopNumber).child(i).child("destination").set(this.state.results[i].destination);
            rootRef.child(this.state.busStopNumber).child(i).child("origin").set(this.state.results[i].origin);
        }
    });

    event.preventDefault();
  
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
          }]
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Bus Stop Number:
          <input type="text" value={this.state.busStopNumber} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Go" />
        </form>
        <ReactTable
            data={this.state.results}
            columns={columns}
        />
      </div>
    );
  }
}

export default App;