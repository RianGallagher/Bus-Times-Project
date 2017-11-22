
import React from 'react';
import './index.js';
import * as firebase from 'firebase';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import Promise from 'promise';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      
    };


    this.handleChange = this.handleChange.bind(this);
  // this.handleSubmit = this.handleSubmit.bind(this);
    this.displayTimes = this.displayTimes.bind(this);
    //this.putTimesIntoTable = this.putTimesIntoTable.bind(this);
  }

  handleChange(event) {
    var temp = [-1], data = [];
    event.preventDefault();
    console.log("in handle change");
    //this.setState({busStopNumber : document.getElementById('stopNum').value});
    var num = document.getElementById('stopNum').value;
    console.log(num);
    let myProm = new Promise(function(resolve, reject) {
       const stopRef = firebase.database().ref().child("timetable").child(num);
      stopRef.on('value', snapshot =>{
          temp = [-1];
          temp = snapshot.val();
          
      });
      setTimeout(function(){
        if (temp[0]!==-1) {
          resolve(temp);
        } else {
          reject('Error');
        }
       },2000);
      });
      myProm.then((fromResolve) =>
        // function(fromResolve) {
        // data = fromResolve;
        // console.log(fromResolve);
       this.displayTimes(fromResolve)
      ).catch(function(fromReject){
        alert(num + " is not a bus route");
      }) 
      
  }


  displayTimes(fromResolve){
     var data = [];
     console.log(fromResolve)
    var longestArrayLength = Math.max(fromResolve[1].weekdays.length, fromResolve[1].saturday.length, fromResolve[1].sunday.length, fromResolve[2].weekdays.length, fromResolve[2].saturday.length,fromResolve[2].sunday.length);
    for (var i = 0; i < longestArrayLength; i++) {

    data.push({
      "weekdayTime1":fromResolve[1].weekdays[i],
      "saturdayTime1": fromResolve[1].saturday[i],
      "sundayTime1": fromResolve[1].sunday[i],
      "weekdayTime2": fromResolve[2].weekdays[i],
      "saturdayTime2": fromResolve[2].saturday[i],
      "sundayTime2": fromResolve[2].sunday[i]
    });
  }

this.setState({ data });

console.dir(data);
  }

  // putTimesIntoTable() {
  //   var data = [];
  //   console.log(this.state.results);
  //   // console.log(this.state.results[1].saturday);
  //   // // Replace all mentions of the the weekdayTimes arrays below with however you're accessing data from the database
  //   // // Afterwards, replace "this.makeCORSRequest()" in the handleSubmit() function with "this.getTimesFromDatabase()"

  //   // var longestArrayLength = Math.max(this.state.results[1].weekdays.length, this.state.results[1].saturday.length, this.state.results[1].sunday.length, this.state.results[2].weekdays.length, this.state.results[2].saturday.length, this.state.results[2].sunday.length);
  //   // for (var i = 0; i < longestArrayLength; i++) {

  //   //   data.push({
  //   //     "weekdayTime1": this.state.results[1].weekdays[i],
  //   //     "saturdayTime1": this.state.results[1].saturday[i],
  //   //     "sundayTime1": this.state.results[1].sunday[i],
  //   //     "weekdayTime2": this.state.results[2].weekdays[i],
  //   //     "saturdayTime2": this.state.results[2].saturday[i],
  //   //     "sundayTime2": this.state.results[2].sunday[i]
  //   //   });
  //   // }

  //   // this.setState({ data });

  //   // console.dir(data);
  // }
  

  render() {
    const columns1 = [{
      id: 'weekdays',
      Header: 'Weekdays',
      accessor: 'weekdayTime1' // Custom value accessors!
    },
    {
      id: 'saturdays',
      Header: 'Saturdays',
      accessor: 'saturdayTime1' // String-based value accessors!
    },
    {
      id: 'sundays',
      Header: 'Sundays',
      accessor: 'sundayTime1' // String-based value accessors!
    }]
    const columns2 = [{
      id: 'weekdays',
      Header: 'Weekdays',
      accessor: 'weekdayTime2' // Custom value accessors!
    },
    {
      id: 'saturdays',
      Header: 'Saturdays',
      accessor: 'saturdayTime2' // String-based value accessors!
    },
    {
      id: 'sundays',
      Header: 'Sundays',
      accessor: 'sundayTime2' // String-based value accessors!
    }]
  
    return (
    <div>
    <form>
      <label>
        Bus Stop Number:
      <input id="stopNum" type="text" />
      </label>
      <input type="submit" value="Go" onClick={this.handleChange}/>
    </form>

        <div id="timetable-container">
          <div class="timetable">
            <div class="center"><strong>heading</strong></div>
            <ReactTable
              data={this.state.data}
              columns={columns1}
              sortable={false}
            />
          </div>
          <div class="timetable">
            <div class="center"><strong>heading</strong></div>
            <ReactTable
              data={this.state.data}
              columns={columns2}
              sortable={false}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;