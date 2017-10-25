import React, { Component } from 'react'
//import PropTypes from 'prop-types'
//import { Router }from 'react-router';
//import { Switch, Route} from 'react-router'
//import { SIGNUP_PATH, LOGIN_PATH } from './Constants'
//import { Link } from 'react-router'
import Login from './components/Login/components/Login';
//import Signup from './components/Signup/components/Signup';
//import Root from './containers/Root';
import Navbar from './containers/Navbar';

//TODO: Inisialize routes
export default class App extends Component {
  render () {
    return (
      <div>
      <div>
        <Navbar>
      </Navbar> 
      </div>
      <div>
      <Login>
      </Login>
      </div>
    </div>

    )
  }
}
