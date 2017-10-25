import React, { Component} from 'react'
import  RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator} from 'react-material-ui-form-validator';
import { Toaster, Intent } from '@blueprintjs/core'
import {app, googleProvider} from '../../../index.js'
import  './Signup.css'
import { Link } from 'react-router'
import GoogleButton from 'react-google-button'
import {  LOGIN_PATH } from 'constants'
//import * as firebase from 'firebase';



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
//TODO: Finish handle submit / Email verificarion / password => more than 6 / test.
export default class Signup extends Component { 
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
    this.providerLogin = this.providerLogin.bind(this);
   // this.handleSubmit = this.handleSubmit.bind(this);
}

componentWillMount() {
  // check if password match
  ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== this.state.formData.password) {
          return false;
      }
      return true;
  });
} 

handleChange(event) {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
}


handleSignup = (event) => {
    event.preventDefault()
    this.setState({
      snackCanOpen: true
    })
        const email = this.state.formData.email
        const password = this.state.formData.repeatPassword
    
   app.auth().fetchProvidersForEmail(email)
      .then((providers) => {
         if (providers.length === 0) {
              // create user
         return app.auth().createUserWithEmailAndPassword(email, password)
        } else { 
            this.toaster.show({ intent: Intent.WARNING, message: "This email is already registered" })
        }
      }
    )
}

//
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


render() {
    const { formData, submitted } = this.state;
    return (
       
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
                <TextValidator
                    floatingLabelText="Repeat password"
                    onChange={this.handleChange}
                    name="repeatPassword"
                    type="password"
                    validators={['isPasswordMatch', 'required']}
                    errorMessages={['password mismatch', 'this field is required']}
                    value={formData.repeatPassword}
                 
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
          <div className="login">
            <span className="loginLabel">
              Already have an account? 
            </span>
            <Link className="loginLink" to={LOGIN_PATH}>
              Login
            </Link>
          </div>
          
        </div>
        </MuiThemeProvider>
    );
}
}
