import React from "react";
import {Link} from "react-router-dom";
import constants from "./Constants";
import firebase from "firebase";
import "firebase/auth"

export default class SignUpView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "" 
        }
    }    

    handleSubmit(evt){
        evt.preventDefault();   
        console.log(
            "creatting user ccount with credentials: %s, %s,%s,%s",
            this.state.firstName,
            this.state.lastName,
            this.state.password

        )

        firebase.auth()
        .createUserWithEmailAndPassword(this.state.email,this.state.password)
        .then(user => user.updateProfile({
            lastTestTaken: null
        }))
        
        .catch(function(error) {
            console.log(error.code + ": " + error.message );
        })
        .then(() => console.log("Success!"));
                                                                         
        this.setState({firstName: "",lastName:"",email:"",password:""});
    }

    render() {
        return (
            <div className="container">
                <h1>Sign Up</h1>
                    <form>  
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input id="lasttName" type="text"className="form-control"
                            placeholder="enter your first name"
                            value={this.state.firstName}
                            onInput={evt => this.setState({firstName: evt.target.value})}
                        />
                        </div>                                                                                                   
                         <div className="form-group">
                        <label htmlFor="lastName">last Name</label>
                        <input id="lastName" type="text"className="form-control"
                            placeholder="enter your first name"
                            value={this.state.lastName}
                            onInput={evt => this.setState({lastName: evt.target.value})}
                        />
                        </div>
                         <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input id="Email" type="text"className="form-control"
                            placeholder="enter your Email"
                            value={this.state.email}
                            onInput={evt => this.setState({email: evt.target.value})}
                        />
                        </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Password</label>
                        <input id="lastName" type="password"className="form-control"
                        placeholder="enter your password"
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
      