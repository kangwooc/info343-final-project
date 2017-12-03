import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

import QuizPageView from './components/QuizPage';

class App extends Component {
  
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="App">
        <QuizPageView />
      </div>
    );
  }
}

export default App;
