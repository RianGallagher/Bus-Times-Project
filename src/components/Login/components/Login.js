import React, { Component} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator} from 'react-material-ui-form-validator';
import { Toaster, Intent } from '@blueprintjs/core'
import {app, googleProvider} from '../../../index.js'
import RaisedButton from 'material-ui/RaisedButton'
//import Checkbox from 'material-ui/Checkbox'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
//import { LOGIN_FORM_NAME } from 'constants'
import GoogleButton from 'react-google-button'
import Paper from 'material-ui/Paper'
import './Login.css'

import { SIGNUP_PATH } from 'constants'
const loginStyles = {
  width: "90%",
  maxWidth: "315px",
  margin: "20px auto",
  border: "1px solid #ddd",
  borderRadius: "5px",
  padding: "10px",
  alignItems: "center",
  justifyContent: "center",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
 
}
//TODO: Wrong password handling / forgot password form / remember button / finish design / routes
export default class Login extends Component { 
  constructor(props) {
    super(props);

    
    this.state = {
      formData: {
        email: '',
        password: '',
        repeatPassword: '',
      },
        submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
   this.handleSignin = this.handleSignin.bind(this);
}
static propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired
  }),
  authError: PropTypes.shape({
    message: PropTypes.string // eslint-disable-line react/no-unused-prop-types
  })
}

state = {
  snackCanOpen: false
}

  handleSignin(event) {
      event.preventDefault()
      this.setState({
        snackCanOpen: true
      })
   
      const email = this.state.formData.email
      const password = this.state.formData.password
  
      app.auth().fetchProvidersForEmail(email)
        .then((providers) => {
          if (providers.length === 0) {
            this.toaster.show({ intent: Intent.WARNING, message: "Incorrect email or password" })
          } else {
            // sign user in
            return app.auth().signInWithEmailAndPassword(email, password)
           
          }
        })
  }

  static propTypes = {
    firebase: PropTypes.object,
    authError: PropTypes.object
  }

 providerLogin() {
      app.auth().signInWithPopup(googleProvider)
        .then((user, error) => {
          if (error) {
            this.toaster.show({ intent: Intent.DANGER, message: "Unable to sign in with Google" })
          } else {
            //this.props.setCurrentUser(user)
            //this.setState({ redirect: true })
          }
        })
     }

  handleChange(event) {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
}

  render () {
    const { formData, submitted } = this.state;
    return  (  
  
      <MuiThemeProvider>
        <div className="container1">
          <div styles={loginStyles} >
         <MuiThemeProvider>
             <div>
        <Toaster ref={(element) => { this.toaster = element }} />
        <Paper className="panel">
        <ValidatorForm
            ref="form"
            onSubmit={(event) => { this.handleSignup(event) }}
        >
        
            <TextValidator
                floatingLabelText="Email"
                onChange={this.handleChange}
                name="email"
                value={formData.email}
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'email is not valid']}
                
            />
            <br/>
            <br />
            <TextValidator
                floatingLabelText="Password"
                onChange={this.handleChange}
                name="password"
                type="password"
                value={formData.password}
                validators={['required']}
                errorMessages={['this field is required']}
            />
              <br/>
              <br />
              <div className="button">
            <RaisedButton
               
                type="Signup"
                label= 'Submit'
                disabled={submitted}
                onSubmit={(event) => { this.handleSignup(event) }}
            />
         </div>
        </ValidatorForm>
        </Paper>
        </div>
        </MuiThemeProvider>
        </div>
      <div className="or">
        or
      </div>
      <div className="providers">
        <GoogleButton onClick={() => this.providerLogin()} />
      </div>
      <div className="signup">
        <span className="signupLabel">
          Need an account?
        </span>
        <Link className="signupLink" to={SIGNUP_PATH}>
          Sign Up
        </Link>
      </div>
    </div>
  </MuiThemeProvider>
)
}
}