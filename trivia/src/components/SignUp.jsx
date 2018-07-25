import React from "react";
import { Link } from "react-router-dom";
import constants from "./Constants";
import firebase from "firebase";
import "firebase/auth";

export default class SignUpView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: undefined,
            email: "",
            password: ""
        }
    } 

    componentDidMount() {
        this.authUnsub = firebase.auth().onAuthStateChanged(user => {
            this.setState({authenticated: user != null});
        });
    }

    componentWillUnmount() {
        this.authUnsub();
    }
    
    handleSubmit(evt){
        evt.preventDefault();
        // handle unique displayName

        if (this.state.displayName === undefined){
            this.setState({errorMessage: "please enter a display name"});
        } else {
            this.setState({working: true, errorMessage: undefined});
            firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
                .then(user => user.updateProfile({
                    displayName: this.state.displayName
                }))
                .catch(err => this.setState({errorMessage: err.message}))
                .then(() => this.setState({working: false}));   
                firebase.auth().onAuthStateChanged(user => {
                    if (user) {
                        this.props.history.push("mainpage");  
                    }
                }); 
        }
    }

    render() {
        return (
            <div className="container">
            <div className = "signup">
                <h1><font color="orange">Welcome to Trivial!</font></h1>
                <h3>Please sign up</h3>
                {
                    this.state.errorMessage &&
                    <p className="alert alert-danger">{this.state.errorMessage}</p>
                }
                <form>
                    <div className="row">
                        <div className="col-md-4"></div>
                        <div className="form-group col-md-4">
                            <label htmlFor="DisplayName">Display name:</label>
                            <input id="displayName" type="text" className="form-control"
                                placeholder="Type your display name / Nickname"
                                value={this.state.displayName}
                                onInput={evt => this.setState({ displayName: evt.target.value })}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4"></div>
                        <div className="form-group col-md-4">
                            <label htmlFor="Email">Email:</label>
                            <input id="email" type="email" className="form-control"
                                placeholder="Enter your Email"
                                value={this.state.email}
                                onInput={evt => this.setState({ email: evt.target.value })}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4"></div>
                        <div className="form-group col-md-4">
                            <label htmlFor="Password">Password:</label>
                            <input id="passWord" type="password" className="form-control"
                                placeholder="Enter your password"
                                value={this.state.password}
                                onInput={evt => this.setState({ password: evt.target.value })}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4"></div>
                        <div className="form-group col-md-4">
                            <button type="button" className="btn btn-info" onClick={e => this.handleSubmit(e)}>Sign Up!</button>
                        </div>
                    </div>
                </form>
                <p>Already have an account? <Link to={constants.routes.signin}>Sign In!</Link></p>
                </div>
            </div>
        );
    }
}
