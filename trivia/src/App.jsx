import React, { Component } from 'react';
import LeaderBoard from './components/LeaderBoard';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      chartData:{
      
      }
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Trivial!</h1>
        </header>
        <LeaderBoard chartData={this.state.chartData} />
      </div>
    );
  }
}

export default App;
