import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
<<<<<<< HEAD
import MainPage from './components/MainPage.jsx';

=======
import firebase from "firebase/app"
>>>>>>> 7c196de8ecba3ccbf344c68b35e29eab48c62201
import QuizPageView from './components/QuizPage';
import ResultPage from './components/ResultPage';

class App extends Component {
  
  constructor(props){
    super(props);
  }

  render() {
    let scoreRef = firebase.database().ref("scores");
    return (
<<<<<<< HEAD
      <MainPage />
      
=======
      <div className="App">
        <QuizPageView scoreRef = {scoreRef}/>
      </div>
>>>>>>> 7c196de8ecba3ccbf344c68b35e29eab48c62201
    );
  }
}

export default App;
