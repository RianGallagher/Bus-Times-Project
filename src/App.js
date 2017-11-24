
import React from 'react';
import './index.js';
import * as firebase from 'firebase';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import Promise from 'promise';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      heading1: '',
      heading2: ''
    };


    this.doSubmit = this.doSubmit.bind(this);
    this.displayTimetime = this.displayTimetable.bind(this);
  }

  doSubmit(event) {
    var temp = [-1], data = [];
    event.preventDefault();
    console.log("in handle change");
    var num = document.getElementById('stopNum').value;
    console.log(num);
    let myProm = new Promise(function(resolve, reject) {
       const stopRef = firebase.database().ref().child("timetable").child(num);
      stopRef.on('value', snapshot =>{
          temp = [null];
          temp = snapshot.val();
          
      });
      setTimeout(function(){
        if (temp!==undefined) {
          resolve(temp);
        } else {
          reject('Error');
        }
       },1200);
      });
      myProm.then((fromResolve) =>
       this.displayTimetable(fromResolve)
      ).catch(function(fromReject){
        alert(num + " is not a bus route");
      }) 
      
  }
  
  displayTimetable(fromResolve){
     var data = [];
     console.log(fromResolve)
     if(fromResolve[2]!==undefined){
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
      this.setState({heading1: fromResolve[1].heading, heading2: fromResolve[2].heading});
      console.log(this.state.heading1);
    }
    else{
      var longestArrayLength = Math.max(fromResolve[1].weekdays.length, fromResolve[1].saturday.length, fromResolve[1].sunday.length);
      for (var i = 0; i < longestArrayLength; i++) {
      
      data.push({
        "weekdayTime1":fromResolve[1].weekdays[i],
        "saturdayTime1": fromResolve[1].saturday[i],
        "sundayTime1": fromResolve[1].sunday[i],
        "weekdayTime2": "-",
       "saturdayTime2": "-",
        "sundayTime2": "-"
      });
    }
    this.setState({heading1: fromResolve[1].heading, heading2: "No Service"});
    console.log(this.state.heading1);
    }

this.setState({ data });

console.dir(data);
  }

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
      <input type="submit" value="Go" onClick={this.doSubmit}/>
    </form>
        <div id="timetable-container">
          <div class="timetable">
            <div class="center"><strong>{this.state.heading1}</strong></div>
            <ReactTable
              data={this.state.data}
              columns={columns1}
              sortable={false}
            />
          </div>
          <div class="timetable">
            <div class="center"><strong>{this.state.heading2}</strong></div>
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