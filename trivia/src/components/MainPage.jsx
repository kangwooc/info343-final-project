import React from 'react';

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
        if(!this.state.taken) {
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
            taken = "Come back tomorrow!";
        }
        return (
            <div className="Main">
                <header className="jumbotron bg-dark">
                    <h1 className="display-3 text-light">Trivial</h1>
                </header>

                {/*leaderboard part*/}
                 
                {taken}


            </div>
        );
    }
}

