import React, {Component} from 'react';


export default class ResultPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            correct: 0
        };
    }

    home() {
        //direct back to mainpage
        //this.props.history.push("/");
    }

    render() {
        return (
            <div>
                <div className="container text-center">
                    <h1 className="display-3 text-dark">
                        Results
                    </h1>
                    <h3>You got {this.state.correct} out of 10</h3>
                    <button
                        className="btn btn-primary" 
                        onClick={() => this.home()}>
                        Home
                    </button>
                </div>
            </div>
        );
    

    }  
}
