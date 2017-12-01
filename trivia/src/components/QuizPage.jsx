import React, {Component} from 'react';
import firebase from 'firebase/app';

export default class QuizPage extends Component {
    
    componentDidMount(){

    }

    componentWillMount(){

    }

    render(){
        return(
            <div id = "quiz">
                <div id="question">
                </div>
                <div id ="answer">
                </div>
            </div>
        );
    }
}