import  React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Timetable from './containers/Timetable/Timetable';
import LiveTimetable from './containers/LiveTimetable/LiveTimetable';
import Auth from './containers/Auth/Auth';
import Container from './containers/Map/Container';
import Notification from './containers/Notification/Notification';

class App extends Component {
  render () {
    return (
      <div>
           <Layout>
           <Switch>
                <Route path="/livetimes" component={LiveTimetable} />
                <Route path="/times" component={Timetable} />
                <Route path="/auth" component={Auth} />
                <Route path="/Map" component={Container} />
                <Route path="/Notification" component={Notification} />
           </Switch>
           </Layout>
      </div>
    );
  }
}

export default App;