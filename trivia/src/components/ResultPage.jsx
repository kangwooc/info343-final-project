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
                <div className="container result">
                    <h1>Congratulations!</h1>
                    <h4>You answered {this.state.correct} out of 10 questions correctly!</h4>
                    <img src="../img/goodjob.jpg"/>
                    <h4>Come back tomorrow and try your luck again.</h4>
                    <button
                        className="btn btn-info" 
                        onClick={() => this.home()}>
                        Home
                    </button>
                </div>
            </div>
        );
    

    }  
}
