import  React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Timetable from './containers/Timetable/Timetable';
import Auth from './containers/Auth/Auth';
import Container from './containers/Map/Container';

class App extends Component {
  render () {
    return (
      <div>
          <Layout>
          <Switch>
            <Route path="/auth" component={Auth} />
			<Route path="/Map" component={Container} />
            <Route path="/"  component={Timetable} />
          </Switch>
          </Layout>
      </div>
    );
  }
}

export default App;
