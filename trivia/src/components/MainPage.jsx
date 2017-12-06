import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
//import LeaderBoard from "./LeaderBoard";


export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }
   
    quiz() {
        this.setState({taken: true});
        //direct to quiz page
    }

    render() {
        let taken;
        var user = firebase.auth().currentUser;
        var dateobj= new Date() ;
        var month = dateobj.getMonth() + 1;
        var day = dateobj.getDate() ;
        var year = dateobj.getFullYear();
        var date = user.month == month && user.day == day && user.year == year;
        if(date) {
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
