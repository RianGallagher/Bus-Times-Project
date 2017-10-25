import React from 'react';
import ReactDOM from 'react-dom';

//import Signup from './components/Signup/components/Signup';
//import SIGNUP_PATH from './Constants';
import './index.css';
import App from './App';
import 'normalize.css/normalize.css';
import '@blueprintjs/core/dist/blueprint.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCEjs14JwhDwrnao-S_dmCqFNTEgVFQ9Qo",
    authDomain: "dublinbusproject.firebaseapp.com",
    databaseURL: "https://dublinbusproject.firebaseio.com",
    projectId: "dublinbusproject",
    storageBucket: "dublinbusproject.appspot.com",
    messagingSenderId: "655945553210"
};

const app = firebase.initializeApp(config);
//const facebookProvider = new firebase.auth.FacebookAuthProvider
const googleProvider  = new firebase.auth.GoogleAuthProvider


ReactDOM.render(<App/>
, document.getElementById('root'));

export { app, googleProvider }