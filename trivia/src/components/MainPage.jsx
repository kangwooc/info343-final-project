import React, { Component } from 'react';
import './App.css';

//import LeaderBoard from "./LeaderBoard";


export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        //if taken: this.state.taken = true
        this.state = {taken: false}
    }

    takeQuiz() {
        return (
            <div className="container">
                <button
                    className="btn btn-primary"
                    onClick={() => this.takeQuiz() } >
                    Take Quiz!
                </button>
            </div>
        );   
    }

    render() {
        let taken;
        if(this.state.taken) {

        }
        return (
            <div className="Main">
                <header className="jumbotron bg-dark">
                    <h1 className="display-3 text-light">Trivial</h1>
                </header>

                {/*leaderboard part*/}
                
 
                {this.state.taken ? 
                "Come back tomorrow!" : takeQuiz()}


            </div>
        );
    }
}

