import React from "react";
import {Link} from "react-router-dom";
import constants from "./Constants";
import firebase from "firebase";
import "firebase/auth"

export default class SignUpView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName:"",
            email: "",
            password: "" 
        }
    }    

    handleSubmit(evt){
        evt.preventDefault();   
        console.log(
            "creatting user account with credentials: %s, %s,%s",
            this.state.displayName,
            this.state.email,
            this.state.password
        );

        firebase.auth()
        .createUserWithEmailAndPassword(this.state.email,this.state.password)
        .then(function(user) {
            if (user) { this.setState({authenticated:true}) } 
            return user;
        }.bind(this))
        .then(user => user.updateProfile({
            lastTestTaken: null
        }))
        .catch(function(error) {
            console.log(error.code + ": " + error.message );
            this.setState({errorMessage: error.message})
        }.bind(this));
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
                            <input id="displayName" type="text"className="form-control"
                                placeholder="Type your DisplayName"
                                value={this.state.displayName}
                                onInput={evt => this.setState({lastName: evt.target.value})}
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
                            <input id="passWord" type="password"className="form-control"
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
      