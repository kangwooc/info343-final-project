import React, { Component } from 'react';
import MainPage from './components/MainPage';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand mb-0 h1"><font color="orange">TRIVIAL</font></span>
      </nav>
        <MainPage  />
        <div class="footer">
          <p></p>
        </div>
      </div>
    );
  }
}

export default App;
