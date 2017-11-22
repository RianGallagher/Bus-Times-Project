import React from 'react';
import './index.js';
import * as firebase from 'firebase';
import ReactTable from 'react-table';
import 'react-table/react-table.css'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      busStopNumber: "",
      route: '',
      destination: '',
      oirigin: '',
      duetime: '',
      speed: ''
    };

    this.handleChange = this.handleChange.bind(this);
  // this.handleSubmit = this.handleSubmit.bind(this);
    this.displayTimes = this.displayTimes.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    console.log("in handle change");
    //this.setState({busStopNumber : document.getElementById('stopNum').value});
    var num = document.getElementById('stopNum').value;
    console.log(num);
    this.displayTimes(num).then(res => {
      console.log("in .then");
      console.log(this.state.results);
    });
    
     
  }

  displayTimes(num){
    return new Promise((resolve, reject) => {
      const stopRef = firebase.database().ref().child("timetable").child(num);
      stopRef.once('value', snapshot =>{
          this.setState({results: snapshot.val()});
      });
      resolve(this.state.results);
    });  
    // const stopRef = firebase.database().ref().child("timetable").child(num);
    //   stopRef.on('value', snapshot =>{
    //       this.setState({results: snapshot.val()});
    //   });
    //   setTimeout(function(){
    //     console.log(this.state.results);
    //   },10000);
    //   console.log(num + " in display times");
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