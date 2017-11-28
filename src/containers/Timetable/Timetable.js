import React from 'react';
import axios from 'axios';
//import './index.js';
import * as firebase from 'firebase';
import ReactTable from 'react-table';
import classes from 'react-table/react-table.css'
import  './Timetable.css'


class Timetable extends React.Component {
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
    
        <div className="test">
            <h6 className="textReal">Timetable</h6>
            <hr/>
            {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                   Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> */}
                   <div>
</div>
    <form >
      <label >
        Enter Bus Route Number:
      <input id="stopNum" type="text" />
       <input type="submit" value="Go" onClick={this.doSubmit}/>
      </label>
     
    </form>
        <div className="timetable-container" style={{display: "flex"}} >
          <div className="timetable" style={{width: "50%"}}>
            <div className="center" style={{textAlign: "center", margin: "auto", width: "50%"}}><strong>{this.state.heading1}</strong></div>
            <ReactTable 
              data={this.state.data}
              columns={columns1}
              sortable={false}
            />
          </div>
          <div className="timetable" style={{width: "50%"}}>
            <div className="center" style={{textAlign: "center", margin: "auto", width: "50%"}}><strong>{this.state.heading2}</strong></div>
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

export default Timetable;