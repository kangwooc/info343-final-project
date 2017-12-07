import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import constants from "./Constants";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import LeaderBoard from './LeaderBoard';
export default class MainPageView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: undefined
        }
    }

    componentDidMount() {
        this.authUnsub = firebase.auth().onAuthStateChanged(user => {
          this.setState({
              displayName:user.displayName,
              authenticated: this.props.authenticated
          });
        });
      }
    
    componentWillUnmount() {
        this.authUnsub();
    }

    handleSignOut() {
        this.setState({working: true});
        firebase.auth().signOut()
          .catch(err => this.setState({errorMessage: err.message}))
          .then(() => this.setState({working: false, authenicated: false}));
          //this.props.history.replace("/"); 
    }

    quiz() {
        // this.setState({taken: true});
        // direct to quiz page
    }

    render() {
        let userDataRef = firebase.database().ref("userdata");
        console.log(userDataRef);
        userDataRef.once("value", snapshot =>
        snapshot.forEach(taskSnapshot => {
            if (taskSnapshot.val().done) {
                console.log(this.props.tasksRef.child(taskSnapshot.key));
            }
    }));
    
        //var ref = firebase.database().ref().child();
        // ref.on("value", function(snapshot) {
        //     console.log(snapshot.val());
        //  }, function (error) {
        //     console.log("Error: " + error.code);
        //  });

        let taken;
        var dateobj= new Date() ;
        var month = dateobj.getMonth() + 1;
        var day = dateobj.getDate() ;
        var year = dateobj.getFullYear();
        //var date = (user.month === month && user.day === day && user.year === year);
        // if(date) {
        //     taken = (
        //         <div className="container">
        //             <button
        //                 className="btn btn-primary" 
        //                 onClick={() => this.quiz()}>
        //                 Take Quiz!
        //             </button>
        //         </div>
        //     ); 
        // } else {    //taken
        //     taken = <h3>Come back tomorrow!</h3>;
        // }
        
        return (
            <div className="Main text-center">
                
                <LeaderBoard  />
                 
                {taken}

                <p>
                <button className="btn btn-danger signout" onClick={()=>this.handleSignOut()}> Sign Out</button>
              </p>
            </div>
        );
    }
}


