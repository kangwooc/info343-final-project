import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import constants from "./Constants";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import LeaderBoard from './LeaderBoard';
export default class MainPage extends Component {
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
          this.props.history.replace("/"); 
    }

    quiz() {
        // this.setState({taken: true});
        //direct to quiz page
    }

    render() {
        console.log(this.state.displayName);
        console.log("Authenticated in mainpage: "+ this.state.authenticated);
        // if(this.props.authenticated!==true){
        //     return (<Redirect to={constants.routes.signin} />)
        // }
        let taken;
        var user = firebase.auth().currentUser;
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
                <button className="btn btn-primary" onClick={()=>this.handleSignOut()}> sign Out!</button>
              </p>
            </div>
        );
    }
}


