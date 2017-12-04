import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
//import LeaderBoard from "./LeaderBoard";


export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        //if taken: this.state.taken = true
        this.state = {taken: false}
    }


     
    quiz() {
        this.setState({taken: true});
        //direct to quiz page
    }

    render() {
        let taken;
        var user = firebase.auth().currentUser;
        var moment = require('moment');
        setTimeout(
            midnightTask,
            moment("24:00:00", "hh:mm:ss").diff(moment(), 'seconds')
         );
         
        function midnightTask() {
           //set user.taken to be false
        }

        if(taken) {
            taken = (
                <div className="container">
                    <button
                        className="btn btn-primary" 
                        onClick={() => this.quiz()}>
                        Take Quiz!
                    </button>
                </div>
            ); 
        } else {    //taken
            taken = <h3>Come back tomorrow!</h3>;
        }

        return (
            <div className="Main text-center">
                <header className="jumbotron bg-dark">
                    <h1 className="display-3 text-light">Trivial</h1>
                </header>

                {/*leaderboard part*/}
                 
                {taken}


            </div>
        );
    }
}
