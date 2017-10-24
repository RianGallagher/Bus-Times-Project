import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.js';
import * as firebase from 'firebase';



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
    const config = {
      apiKey: "AIzaSyCEjs14JwhDwrnao-S_dmCqFNTEgVFQ9Qo",
      authDomain: "dublinbusproject.firebaseapp.com",
      databaseURL: "https://dublinbusproject.firebaseio.com",
      projectId: "dublinbusproject",
      storageBucket: "dublinbusproject.appspot.com",
      messagingSenderId: "655945553210"
  };
  
  firebase.initializeApp(config);
  }

  handleChange(event) {
    this.setState({ busStopNumber: event.target.value });
  }

  handleSubmit(event) {
    axios.get(`https://data.dublinked.ie/cgi-bin/rtpi/realtimebusinformation?stopid=${this.state.busStopNumber}&format=json`)
    .then(res => {
      const results = res.data.results;
      this.setState({ results });
    });
    
      const rootRef = firebase.database().ref();
      for(var i =0; i<this.state.results.length; i++){
        rootRef.child(this.state.busStopNumber).child(i).child("duetime").set(this.state.results[i].duetime);
        rootRef.child(this.state.busStopNumber).child(i).child("route").set(this.state.results[i].route);
        rootRef.child(this.state.busStopNumber).child(i).child("destination").set(this.state.results[i].destination);
        rootRef.child(this.state.busStopNumber).child(i).child("origin").set(this.state.results[i].origin);
      }
    
    event.preventDefault();
  
  
  }
  

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Bus Stop Number:
          <input type="text" value={this.state.busStopNumber} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Go" />
          <h1>{this.state.speed}</h1>
        </form>
       
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

export default App;