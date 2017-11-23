import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import * as firebase from 'firebase';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import authReducer from './store/reducers/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
   
    auth: authReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

const config = {
    apiKey: "AIzaSyCEjs14JwhDwrnao-S_dmCqFNTEgVFQ9Qo",
    authDomain: "dublinbusproject.firebaseapp.com",
    databaseURL: "https://dublinbusproject.firebaseio.com",
    projectId: "dublinbusproject",
    storageBucket: "dublinbusproject.appspot.com",
    messagingSenderId: "655945553210"
};

firebase.initializeApp(config);

ReactDOM.render( app, document.getElementById( 'root' ) );
registerServiceWorker();
