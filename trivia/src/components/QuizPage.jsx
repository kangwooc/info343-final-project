import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export default class QuizPageView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            API_KEY: "https://opentdb.com/api.php?amount=3&type=multiple",
            token: undefined,
            QNAs: {},
            score: 0,
            problemNum: 1,
            selectedOption: undefined,
            displayName: undefined
        };
        this.getOption = this.getOption.bind(this);
    }

    // componentDidMountTimer() {
    //     setInterval(
    //         function() {
    //             this.setState({time: this.state.time - 100 });       
    //         }.bind(this)
    //         , 100);
    //         if (this.state.time === 0) {
    //             //direct to next question
    //             this.setState({time: 1000});

    //         }
    //     // a question has been answered
    //     //this.setState({time: 1000});
    //     return(
    //         <div>
    //             {this.state.time}
    //         </div>
    //     );
    // }


    componentDidMount() {
        this.authUnsub = firebase.auth().onAuthStateChanged((user) => {
            this.setState(
                {
                    authenticated: true,
                    displayName: user.displayName
                })
        });
        fetch(this.state.API_KEY)
            .then(response => response.json())
            .then((data) => {
                let myQNAs = {};
                var h = 1;
                data.results.forEach(function (elem) {
                    let QNA = {
                        number: h,
                        question: "",
                        answers: [],
                        answer: ""
                    };
                    let q = elem.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'");
                    var anss = [];
                    for (let i = 0; i < elem.incorrect_answers.length; i++) {
                        anss.push(elem.incorrect_answers[i].replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&scaron;/g, "š"));
                    }
                    var ans = elem.correct_answer.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&scaron;/g, "š");
                    QNA.question = q;
                    QNA.answers = anss;
                    QNA.answer = ans;
                    QNA.answers.push(QNA.answer);
                    myQNAs[h] = QNA;
                    h++;
                })
                for (let i = 1; i <= data.results.length; i++) {
                    this.shuffleArray(myQNAs[i].answers);
                }
                this.setState({ QNAs: myQNAs });
            })
            .catch(err => console.error(err));
    }

    componentWillUnMount() {
        this.authUnsub();
        this.props.dateRef.off("value");
        this.props.displayNameRef.off("value");
        this.props.scoreRef.off("value");
    }

    shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    handleAnswer(evt, score) {
        evt.preventDefault();
        let h = this.state.problemNum;
        console.log("h in handleAnswer = " + h);
        { console.log("Quiz current score state: " + this.state.score) }
        if (h < 3) {
            if (this.state.selectedOption === this.state.QNAs[h].answer) {
                score++;
            }
            h++;
            this.setState({
                problemNum: h
            })
            this.setState({ score: score, selectedOption: undefined });
        } else if (h === 3) {
            let userDataRef = firebase.database().ref("userdata")
            var dateobj = new Date();
            var month = dateobj.getMonth() + 1;
            var day = dateobj.getDate();
            var year = dateobj.getFullYear();
            console.log(this.state.displayName);
            let userData = {
                score: this.state.score,
                displayName: this.state.displayName,
                dateTaken: {
                    monthTaken: month,
                    dayTaken: day,
                    yearTaken: year
                }
            }
            let newPostKey = userDataRef.child('posts').push().key;
            var updates = {};
            updates[month + "-" + day + "-" + year + '/' + this.state.displayName] = userData;
            this.props.history.push("resultpage");
            return firebase.database().ref().update(updates);
        }
        console.log("total score: " + this.state.score);
        console.log("this state selectedOption is: " + this.state.selectedOption);
        console.log("handleAnswer state: " + this.state.score);
    }

    getOption(data) {
        console.log(data);
        this.setState({ selectedOption: data });
        //this.setState({selectedOption:data});
    }

    render() {
        return (
            <div id="quiz">
                {/* {this.componentDidMountTimer()} */}
                {/* <Timer countDown startTime={10} tick={1000}/> */}
                <form onSubmit={(evt) => this.handleAnswer(evt, this.state.score)}>
                    <Quiz problem={this.state.QNAs[this.state.problemNum]} score={this.state.score} sendOption={this.getOption} mySelectedOption={this.state.selectedOption} />
                    {this.state.selectedOption === undefined ? undefined : <button className="btn btn-info nextbutton" type="submit" >Next &#8594;</button>}
                </form>
            </div>
        );
    }
}

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: undefined
        }
    }

    handleOptionChange(changeEvent) {
        this.setState({
            selectedOption: changeEvent.target.value
        });
        let value = changeEvent.target.value;
        this.sendOption(value);
    }

    sendOption(selectedOption) {
        console.log("selectedOption: " + selectedOption);
        this.props.sendOption(selectedOption);
    }

    render() {

        return (
            <div>
                {this.props.problem !== undefined ?
                    <div>
                        <div id="score">{this.props.score} out of {this.props.problem.number}</div>
                        <div id="question" className="alert alert-dark">{this.props.problem.number}.{" " + this.props.problem.question}</div>
                        <form>
                            <div className="radio">
                                <label>
                                    <input type="radio" value={this.props.problem.answers[0]}
                                        checked={this.state.selectedOption === this.props.problem.answers[0]}
                                        onChange={(evt) => this.handleOptionChange(evt)} />
                                    {" " + this.props.problem.answers[0]}
                                </label>
                            </div>
                            <div className="radio">
                                <label>
                                    <input type="radio" value={this.props.problem.answers[1]}
                                        checked={this.state.selectedOption === this.props.problem.answers[1]}
                                        onChange={(evt) => this.handleOptionChange(evt)} />
                                    {" " + this.props.problem.answers[1]}
                                </label>
                            </div>
                            <div className="radio">
                                <label>
                                    <input type="radio" value={this.props.problem.answers[2]}
                                        checked={this.state.selectedOption === this.props.problem.answers[2]}
                                        onChange={(evt) => this.handleOptionChange(evt)} />
                                    {" " + this.props.problem.answers[2]}
                                </label>
                            </div>
                            <div className="radio">
                                <label>
                                    <input type="radio" value={this.props.problem.answers[3]}
                                        checked={this.state.selectedOption === this.props.problem.answers[3]}
                                        onChange={(evt) => this.handleOptionChange(evt)} />
                                    {" " + this.props.problem.answers[3]}
                                </label>
                            </div>
                        </form>
                    </div>
                    : undefined}
            </div>
        );

    }
}