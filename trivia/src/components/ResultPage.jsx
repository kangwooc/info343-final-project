import React, {Component} from 'react';
import constants from './Constants';
import firebase from "firebase/app";
import 'firebase/auth';
import "firebase/database";

export default class ResultPage extends Component {
x
    constructor(props){
        super(props);
        this.state = {
            //correct: 0
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
        // let scoreRef = firebase.database().ref(month+"-"+day+"-"+year).on("value", (snapshot)=>{
        // });
        
    }

    clickHome() {
        this.props.history.push("/mainpage");
    }

    render() {
        let content = undefined;
        if(this.props.score===10){
            content = (<div>
                <div className="container" id = "result">
                    <h1>Congratulations! {this.state.displayName}</h1>
                    <h4>you answered {this.props.score} out of 10 questions correctly!</h4>
                    <img src={constants.routes.congratulationImg} alt = "congratulation" />
                    <h4>Come back tomorrow and try your luck again.</h4>
                    <button
                        className="btn btn-info" 
                        onClick={() => this.clickHome()}>
                        Home
                    </button>
                </div>
            </div>);
        }else if (this.props.score<=9&&this.props.score>4){
            content = (<div>
                <div className="container" id = "result">
                    <h1>Good Work! {this.state.displayName}</h1>
                    <h4>you answered {this.props.score} out of 10 questions correctly!</h4>
                    <img src={constants.routes.goodjobImg} alt = "good job"/>
                    <h4>Come back tomorrow and try your luck again.</h4>
                    <button
                        className="btn btn-info" 
                        onClick={() => this.clickHome()}>
                        Home
                    </button>
                </div>
            </div>);
        }else if(this.props.score<=4&&this.props.score>0){
            content = (
                <div>
                    <div className="container" id = "result">
                        <h1>Need to Study! {this.state.displayName}</h1>
                        <h4>you answered {this.props.score} out of 10 questions correctly!</h4>
                        <img src={constants.routes.needtoWorkImg} alt = "need to study" />
                        <h4>Come back tomorrow and try your luck again.</h4>
                        <button
                            className="btn btn-info" 
                            onClick={() => this.clickHome()}>
                            Home
                        </button>
                    </div>
                </div>
                );
        }else{
            content = (
            <div>
                <div className="container" id = "result">
                    <h1>Need to Study! {this.state.displayName}</h1>
                    <h4>you answered {this.props.score} out of 10 questions correctly!</h4>
                    <img src={constants.routes.whattheHellImg} alt = "what the hell" />
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
        return (
            
            <div>
                {console.log("yppp" + this.props.score)}
                {content}
            </div>
        );
    

    }  
}
