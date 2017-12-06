import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import MainPage from './components/MainPage.jsx';
import firebase from 'firebase/app'
import QuizPageView from './components/QuizPage';
import ResultPage from './components/ResultPage';

class App extends Component {
  
  constructor(props){
    super(props);
  }

  render() {
    let scoreRef = firebase.database().ref("scores");
    let usersRef = firebase.database().ref("displayName");

    return (
      <div className="App">
        <QuizPageView scoreRef = {scoreRef} usersRef = {usersRef}/>
      </div>
    );
  }
}

export default App;
