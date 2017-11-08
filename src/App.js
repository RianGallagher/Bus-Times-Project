import  React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Timetable from './containers/Timetable/Timetable';
import Auth from './containers/Auth/Auth';

class App extends Component {
  render () {
    return (
      <div>
          <Layout>
          <Switch>
            <Route path="/auth" component={Auth} />
            <Route path="/" exact component={Timetable} />
          </Switch>
          </Layout>
        <Timetable />
      </div>
    );
  }
}

export default App;
