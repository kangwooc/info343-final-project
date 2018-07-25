import React from "react";
import { Link } from "react-router-dom";
import constants from "./Constants";
import firebase from "firebase";
import "firebase/auth";
import MainPageView from './MainPage';


export default class SignInView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated:false,
            email: "",
            password: ""
        };
    }
    componentDidMount() {
        this.authUnsub = firebase.auth().onAuthStateChanged(user => {
          this.setState({authenticated: user != null});
        });
      }

    componentWillUnmount() {
        this.authUnsub();
    }

    handleSubmit(evt) {
        evt.preventDefault();
        this.setState({working: true, errorMessage: undefined});
        firebase.auth()
            .signInWithEmailAndPassword(this.state.email,this.state.password)
            .catch(err => this.setState({errorMessage: err.message}))
            .then(() => this.setState({working: false}));
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.props.history.push("mainpage");            
            }
        });
    }    

    render() {
        return (this.state.authenticated ? <MainPageView /> :
            <div className = "container">
                <div className = "signin">
                <header>
                    <h1><font color = "orange">Welcome to Trivial!</font></h1>
                    <h3>Please sign in</h3>
                </header>
                {
                    this.state.errorMessage &&
                    <p className = "alert alert-danger">{this.state.errorMessage}</p>
                }
                <form onSubmit = {evt => this.handleSubmit(evt)}>
                    <div className = "row">
                        <div className = "col-md-4"></div>
                        <div className = "form-group col-md-4 emailentry">
                            <label htmlFor = "email">Email:</label>
                            <input id = "email" type = "email" className = "form-control"
                                placeholder = "enter your email address"
                                value = {this.state.email}
                                onInput = {evt => this.setState({ email: evt.target.value })} />
                        </div>
                    </div>
                    <div className = "row">
                        <div className = "col-md-4"></div>
                        <div className = "form-group col-md-4 ">
                            <label htmlFor = "password">Password:</label>
                            <input id = "password" type = "password" className = "form-control"
                                placeholder = "enter your password"
                                value={this.state.password}
                                onInput={evt => this.setState({ password: evt.target.value })} />
                        </div>
                    </div>
                    <div className = "row">
                        <div className = "col-md-4"></div>
                        <div className = "form-group col-md-4">
                            <button type = "submit" className = "btn btn-info" onClick = {e => this.handleSubmit(e)}>Sign In</button>
                        </div>
                    </div>
                </form>
                <p>Don't have an account yet? <Link to = {constants.routes.signup}>Sign Up!</Link></p>
                </div>
            </div>
        );
    }
}
