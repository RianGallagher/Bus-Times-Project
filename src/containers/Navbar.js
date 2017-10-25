import React, { Component } from 'react'
//import PropTypes from 'prop-types'
//import { Link } from 'react-router'
import {app} from '../index.js'
//import { Redirect } from 'react-router-dom'



//TODO: making routes working
export default class Navbar extends Component {
  constructor() { 
    super()
    this.state = {
      redirect: false
    }
    this.logout = this.logout.bind(this);
  }

  logout() { 
    app.auth().signOut().then((user) => {
      this.setState({ redirect: true })
    })
  }
  render ( ) { 
    // if (this.state.redirect === true) {
    //   return <Redirect to="/" />
    // }
    return ( 
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">Navbar</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavDropdown">
    <ul className="navbar-nav">
      <li className="nav-item active">
        {/*<Link to="/signup">*/}
        <a className="nav-link" >Sign up <span className="sr-only">(current)</span></a>
        {/*</Link>*/}
      </li>
      <li className="nav-item">
      <a className="nav-link">Log in <span className="sr-only">(current)</span></a>
        
      </li>
      <li className="nav-item">
      <a className="nav-link" onClick={() =>{this.logout()}} >Log out <span className="sr-only">(current)</span></a>
        
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle"  id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
          Dropdown link
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a className="dropdown-item" href="#">Action</a>
          <a className="dropdown-item" href="#">Another action</a>
          <a className="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
    </ul>
  </div>
</nav>
    )
  }
}
