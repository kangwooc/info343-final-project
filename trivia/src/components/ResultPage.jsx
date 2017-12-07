import React, {Component} from 'react';
import constant from './Constants';
import firebase from "firebase/app";
import 'firebase/auth';
import "firebase/database";

export default class ResultPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            correct: 0
        };
    }

    componentDidMount(){
        this.authUnsub = firebase.auth().onAuthStateChanged(user => {
            this.setState({displayName: user.displayName});
        });
    }

    componentWillMount(){
        this.getScore();
    }

    getScore(){
        var dateobj= new Date() ;
        var month = dateobj.getMonth() + 1;
        var day = dateobj.getDate() ;
        var year = dateobj.getFullYear();
        console.log(console.log(this.state.displayName));
        // let scoreRef = firebase.database().ref(month+"-"+day+"-"+year).child(displayName).on("value", (snapshot)=>{
            
        // });
    }

    clickHome() {
        this.props.history.push("/mainpage");
    }

    render() {
        return (
            <div>
                <div className="container" id = "result">
                    <h1>Congratulations!</h1>
                    <h4>You answered {this.state.correct} out of 10 questions correctly!</h4>
                    <img src="../goodjob.jpg" alt = "good job" height="42" width="42"/>
                    <h4>Come back tomorrow and try your luck again.</h4>
                    <button
                        className="btn btn-info" 
                        onClick={() => this.clickHome()}>
                        Home
                    </button>
                </div>
            </div>
        );
    

    }  
}
