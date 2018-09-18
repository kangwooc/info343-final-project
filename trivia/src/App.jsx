import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import SignUpView from './components/SignUp';
import SignInView from './components/SignIn';
import constants from './components/Constants';
import MainPageView from './components/MainPage';
import QuizPageView from './components/QuizPage';
import ResultPageView from './components/ResultPage';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authenicated: false,
      displayName: undefined,
      score:0,
      time:10
    };
    this.getScore = this.getScore.bind(this);
  }

  componentDidMount() {
    this.authUnsub = firebase.auth().onAuthStateChanged(user => {
      this.setState({ authenicated: user != null });
    });
  }

  componentWillUnmount() {
    this.authUnsub();
  }

  handleSignUp() {
    this.setState({ working: true, errorMessge: undefined });
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => user.updateProfile({
        displayName: this.state.displayName,
        authenicated: true
      }))
      .catch(err => this.setState({ errorMessage: err.message }))
      .then(() => this.setState({ working: false }));
  }

  handleScore(score) {   
    this.setState({score: score});
  }

  handleSignIn() {
    this.setState({ working: true, errorMessage: undefined });
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(err => this.setState({ errorMessage: err.message, authenicated: true }))
      .then(() => this.setState({ working: false }));
  }

  getScore(data){
    this.setState({score:data});
  }

  render() {

    return (
      
      <div className="App">
        <nav className="navbar navbar-dark bg-dark">
          <span className="navbar-brand mb-0 h1"><font color="orange">TRIVIAL</font></span>
        </nav>
        <div className="container">
          {
            this.state.errorMessage ? <div className="alert alert-danger">{this.state.errorMessage}</div> :
              undefined
          }
          <span>{this.state.working ? "working on it !" : undefined}</span>
          <Router>
            <Switch>
              <Route exact path={constants.routes.signin} component={SignInView} />
              <Route path={constants.routes.signup} component={SignUpView} />
              <Route path={constants.routes.mainpage} render = {(props)=><MainPageView {...props}/>} />
              <Route path={constants.routes.quizpage} render={(props) => (
                <QuizPageView {...props} score = {this.state.score} sendScore={this.getScore} time={this.props.time} />
              )}
              />
              <Route path = {constants.routes.resultpage} render={(props)=>(
                <ResultPageView {...props} score = {this.state.score} />
              )}/>
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;