import  React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Timetable from './containers/Timetable/Timetable';
import LiveTimetable from './containers/LiveTimetable/LiveTimetable';
import Auth from './containers/Auth/Auth';

class App extends Component {
  render () {
    return (
      <div>
           <Layout>
          <Switch>
            <Route path="/livetimes" component={LiveTimetable} />
            <Route path="/times" component={Timetable} />
            <Route path="/auth" component={Auth} />        
          </Switch>
          </Layout> 
      </div>
    );
  }
}

export default App;
