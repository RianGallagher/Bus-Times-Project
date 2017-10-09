import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCEjs14JwhDwrnao-S_dmCqFNTEgVFQ9Qo",
    authDomain: "dublinbusproject.firebaseapp.com",
    databaseURL: "https://dublinbusproject.firebaseio.com",
    projectId: "dublinbusproject",
    storageBucket: "dublinbusproject.appspot.com",
    messagingSenderId: "655945553210"
};

firebase.initializeApp(config);


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
