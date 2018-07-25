import React, { Component } from 'react';
import decode from 'urldecode';
import swal from 'sweetalert';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


export default class QuizPageView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            API_KEY: "https://opentdb.com/api.php?amount=10&type=multiple&encode=url3986&difficulty=hard",
            token: undefined,
            QNAs: {},
            score: 0,
            problemNum: 1,
            selectedOption: undefined,
            correct: undefined
        };
        this.getOption = this.getOption.bind(this);
        this.sendScore = this.sendScore.bind(this);
    }

    componentDidMount() {
        this.authUnsub = firebase.auth().onAuthStateChanged((user) => {
            this.setState(
                {
                    authenticated: true,
                    displayName: user.displayName
                })
        }
        );

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
                        answer: "",
                        time:10000
                    };
                    let q = decode(elem.question);
                    var anss = [];
                    for (let i = 0; i < elem.incorrect_answers.length; i++) {
                        anss.push(decode(elem.incorrect_answers[i]));
                    }
                    var ans = decode(elem.correct_answer);
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
                console.log(myQNAs);
            })
            .catch(err => console.error(err));
    }

    componentWillUnMount() {
        this.authUnsub();
    }

    shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    handleAnswer(evt) {
        evt.preventDefault();
        let h = this.state.problemNum;
        var myScore = this.state.score;
        console.log("h in handleAnswer = " + h);
        console.log("user displayname = " + this.state.displayName);
        console.log("Quiz current score state: " + this.state.score);
        console.log("Quiz prop score :" + this.props.score);
        if (h < 10) {
            if (this.state.selectedOption === this.state.QNAs[h].answer) {
                myScore++;
                console.log("113 line score: " + this.state.score);
                console.log(myScore);
                this.setState({ score: myScore, correct: true });
                console.log("116 line score: " + this.state.score);
                swal("Yeah!", "You got it right!", "success");

            } else {
                this.setState({ correct: false });
                swal("Oops!", "The correct answer is " + this.state.QNAs[h].answer, "error");
            }
            console.log("118 line score: " + this.state.score);
            h++;
            this.setState({
                problemNum: h
            })
            this.setState({ selectedOption: undefined });
        } else if (h === 10) {
            if (this.state.selectedOption === this.state.QNAs[h].answer) {
                myScore++;
                this.state.score = myScore;
                swal("Yeah!", "You got it right!", "success");

            } else {
                swal("Oops!", "The correct answer is " + this.state.QNAs[h].answer, "error");
            }
            
            var finalScore = this.state.score;
            this.sendScore(finalScore);

            let userDataRef = firebase.database().ref("userdata")
            var dateobj = new Date();
            var month = dateobj.getMonth() + 1;
            var day = dateobj.getDate();
            var year = dateobj.getFullYear();
            
            let userData = {
                score: this.state.score,
                displayName: this.state.displayName,
                dateTaken: {
                    monthTaken: month,
                    dayTaken: day,
                    yearTaken: year
                }
            }
            var updates = {};
            updates[month + "-" + day + "-" + year + '/' + this.state.displayName] = userData;
            this.props.history.push("/resultpage");
            return firebase.database().ref().update(updates);
        }
    }

    getOption(data) {
        this.setState({ selectedOption: data });
    }

    sendScore(data) {
        this.props.sendScore(data);
    }

    render() {
        return (
            <div id = "quiz" className = "container">
                <form onSubmit = {(evt) => this.handleAnswer(evt)}>
                    <Quiz problem={this.state.QNAs[this.state.problemNum]} score = {this.state.score} sendOption = {this.getOption} mySelectedOption = {this.state.selectedOption} />
                    {this.state.selectedOption === undefined ? undefined :
                        <div>
                            <button className = "btn btn-info nextbutton" type = "submit" >Next &#8594;</button>
                        </div>}
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
        this.props.sendOption(selectedOption);
    }

    render() {
        return (
            <div>
                {this.props.problem !== undefined ?
                    <div>
                        <div id = "score">{this.props.score} out of {this.props.problem.number}</div>
                        <div id = "question" className = "alert alert-dark">{this.props.problem.number}.{" " + this.props.problem.question}</div>
                        <form>
                            <div className = "radio">
                                <label>
                                    <input type = "radio" value = {this.props.problem.answers[0]}
                                        checked = {this.state.selectedOption === this.props.problem.answers[0]}
                                        onChange = {(evt) => this.handleOptionChange(evt)} />
                                    {" " + this.props.problem.answers[0]}
                                </label>
                            </div>
                            <div className="radio">
                                <label>
                                    <input type = "radio" value = {this.props.problem.answers[1]}
                                        checked = {this.state.selectedOption === this.props.problem.answers[1]}
                                        onChange = {(evt) => this.handleOptionChange(evt)} />
                                    {" " + this.props.problem.answers[1]}
                                </label>
                            </div>
                            <div className = "radio">
                                <label>
                                    <input type = "radio" value = {this.props.problem.answers[2]}
                                        checked = {this.state.selectedOption === this.props.problem.answers[2]}
                                        onChange = {(evt) => this.handleOptionChange(evt)} />
                                    {" " + this.props.problem.answers[2]}
                                </label>
                            </div>
                            <div className="radio">
                                <label>
                                    <input type = "radio" value = {this.props.problem.answers[3]}
                                        checked = {this.state.selectedOption === this.props.problem.answers[3]}
                                        onChange = {(evt) => this.handleOptionChange(evt)} />
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