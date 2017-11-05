import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ReactTable from 'react-table'
import 'react-table/react-table.css'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      busStopNumber: ''
    };

    // For entering bus stop numbers: https://reactjs.org/docs/forms.html
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    event.preventDefault();
  }

  componentDidMount() {
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
        <form onSubmit={this.handleSubmit} id="myForm">
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

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

export default App;