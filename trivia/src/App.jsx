import React, { Component } from 'react';
import LeaderBoard from './components/LeaderBoard';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand mb-0 h1">Trivial</span>
      </nav>
        <LeaderBoard  />
      </div>
    );
  }
}

export default App;
