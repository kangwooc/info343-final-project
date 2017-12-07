import React from "react";
import { Link, Redirect } from "react-router-dom";
import constants from "./Constants";
import firebase from "firebase";
import "firebase/auth";

export default class SignUpView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName:"",
            email: "",
            password: "",
            authenticated:false 
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
        if (!this.state.displayName){
            this.setState({errorMessage: "please enter a display name"});
        } else {
            this.setState({working: true, errorMessage: undefined});
            firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
            .catch(err => this.setState({errorMessage: err.message}))
            .then(() => this.setState({working: false})); 
            firebase.auth().onAuthStateChanged(user => {
                if(user) {
                    this.props.history.push("mainpage");  
                }
            }); 
        }
        this.setState({email: "", password: "", displayName: ""});        
    }

    render() {

        return (
            <div className="container">
                <h1>Sign Up</h1>
                    
                    {   this.state.errorMessage &&
                        <p className="alert alert-danger">{this.state.errorMessage}</p>    
                    }
                
                    <form>                                                                                                 
                        <div className="form-group">
                            <label htmlFor="DisplayName">Display Name</label>
                            <input id= "displayName" type = "text" className="form-control"
                                placeholder="Type your DisplayName"
                                value={this.state.displayName}
                                onInput={evt => this.setState({displayName: evt.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Email">Email</label>
                            <input id="email" type="email" className="form-control"
                                placeholder="Enter your Email"
                                value={this.state.email}
                                onInput={evt => this.setState({email: evt.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Password">Password</label>
                            <input id="passWord" type="password" className="form-control"
                            placeholder="Enter your password"
                            value={this.state.password}
                            onInput={evt => this.setState({password: evt.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <button type="button" className="btn btn-primary" onClick={e => this.handleSubmit(e)}>
                                 SignUp!
                            </button>
                        </div>
                    </form>
                    <p>Already have an account? <Link to={constants.routes.signin}>Sign In!</Link></p>
              </div>
        );
    }
}
      