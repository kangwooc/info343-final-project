import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import MainPage from './components/MainPage.jsx';

import QuizPageView from './components/QuizPage';
import ResultPage from './components/ResultPage';

class App extends Component {
  
  constructor(props){
    super(props);
  }

  render() {
    return (
      <MainPage />
      
    );
  }
}

export default App;
