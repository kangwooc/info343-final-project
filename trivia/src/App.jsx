import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import firebase from "firebase/app"
import QuizPageView from './components/QuizPage';

class App extends Component {
  
  constructor(props){
    super(props);
  }

  render() {
    let scoreRef = firebase.database().ref("scores");
    return (
      <div className="App">
        <QuizPageView scoreRef = {scoreRef}/>
      </div>
    );
  }
}

export default App;
