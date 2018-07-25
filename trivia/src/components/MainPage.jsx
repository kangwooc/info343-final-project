import React, { Component } from 'react';
import constants from "./Constants";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import LeaderBoard from './LeaderBoard';

export default class MainPageView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: undefined,
            taken: undefined
        }
    }

    componentDidMount() {
        this.authUnsub = firebase.auth().onAuthStateChanged(user => {
            this.setState({
                displayName: user.displayName,
                authenticated: this.props.authenticated
            });
        });
        
        var taken;
        var dateobj = new Date();
        var month = dateobj.getMonth() + 1;
        var day = dateobj.getDate();
        var year = dateobj.getFullYear();
        var displayNames = [];
        let dataRef = firebase.database().ref(month + "-" + day + "-" + year).on("value", (snapshot) => {
            console.log(snapshot.val());
            snapshot.forEach(function (childSnapshot) {
                displayNames.push(childSnapshot.val().displayName);
            })
            if (displayNames.length !== 0) {
                for (let i = 0; i < displayNames.length; i++) {
                    if ((this.state.displayName === displayNames[i]) || this.state.displayName === undefined ) {
                        this.setState({ taken: (<h3>Come back tomorrow!</h3>) });
                        break;
                    } else {    //taken
                        this.setState({
                            taken: (
                                <div className = "container">
                                <div>
                                <p>Challenge yourself with <strong>Hard</strong> Question</p>
                                <p>Compare your score with other people!</p>
                                </div>
                                    <button
                                        className="btn btn-info"
                                        onClick={(evt) => this.quiz(evt)}>
                                        Take Quiz!
                                    </button>
                                </div>
                            )
                        });
                    }
                    console.log(taken);
                }
            } else {
                this.setState({
                    taken: (
                        <div className="container">
                        <div>
                        <p>Challenge yourself with <strong>Hard</strong> Question</p>
                        <p>Compare your score with other people!</p>
                        </div>
                            <button
                                className="btn btn-info"
                                onClick={(evt) => this.quiz(evt)}>
                                Take Quiz!
                            </button>
                        </div>
                    )
                });
            }
            
        });
    }

    componentWillUnmount() {
        this.authUnsub();
    }

    handleSignOut() {
        this.setState({ working: true });
        firebase.auth().signOut()
            .catch(err => this.setState({ errorMessage: err.message }))
            .then(() => this.setState({ working: false, authenicated: false }));
        this.props.history.replace(constants.routes.signin);
    }

    quiz(evt) {
        evt.preventDefault();
        this.props.history.replace(constants.routes.quizpage);
        //<Redirect to = {constants.routes.quizpage}/>
    }

    render() {
        return (
            <div className="Main text-center">
                <LeaderBoard />
                {this.state.taken}
                <div className="footer">
                    <button className="btn-sm btn-danger text-center signoutbutton" onClick={()=>this.handleSignOut()}> Sign Out</button>
                </div>
            </div>
        );
    }
}


