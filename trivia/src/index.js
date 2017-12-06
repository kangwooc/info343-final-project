import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from "firebase/app"
import registerServiceWorker from './registerServiceWorker';
var config = {
    apiKey: "AIzaSyCuJ_qu84ygtmZ5vNOlGFsCxsRyBSqBGWg",
    authDomain: "info343-final-ff532.firebaseapp.com",
    databaseURL: "https://info343-final-ff532.firebaseio.com",
    projectId: "info343-final-ff532",
    storageBucket: "info343-final-ff532.appspot.com",
    messagingSenderId: "493150428563"
  };
  
  firebase.initializeApp(config);
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
