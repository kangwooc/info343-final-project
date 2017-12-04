import React, {Component} from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export default class QuizPageView extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            checked: false,
            API_KEY: "https://opentdb.com/api.php?amount=10&type=multiple",
            token: undefined,
            QNAs: [],
            score: 0
        };
    }
    
    componentWillMount(){
        this.authUnsub= firebase.auth().onAuthStateChanged((user)=>{
            this.setState({currentUser:user})
        });

        fetch(this.state.API_KEY)
        .then(response => response.json())
        .then((data)=>{
            let QNAs =[];
            data.results.forEach(function(elem){
                let QNA = {
                    question:"",
                    answers:[],
                    answer:""
                };
                let q = elem.question.replace(/&quot;/g,'"').replace(/&#039;/g,"'");
                var anss = [];
                for(let i=0;i<elem.incorrect_answers.length;i++){
                    anss.push(elem.incorrect_answers[i].replace(/&quot;/g,'"').replace(/&#039;/g,"'").replace(/&scaron;/g,"š"));
                }
                var ans = elem.correct_answer.replace(/&quot;/g,'"').replace(/&#039;/g,"'").replace(/&scaron;/g,"š");
                QNA.question = q;
                QNA.answers = anss;
                QNA.answer = ans;
                console.log(QNA.answers);
                console.log(QNA.answer);
                QNA.answers.push(QNA.answer);
                QNAs.push(QNA);
            })
            this.setState({
                QNAs:QNAs
            });
            for(var i = 0;i < data.results.length; i++){
                this.shuffleArray(this.state.QNAs[i].answers);
            }
        })
        .catch(err => console.error(err));
    }

    componentWillUnMount(){
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


    

    // changeDate(){
    //     let day = new Date();
    //     let n = day.getUTCDay();
    //     console.log(n);
    //     console.log(day.getUTCDay());
    //     return ( n !== day.getUTCDay());
    // }
    handleAnswer(evt){
        evt.preventDefault();
    }
    
    handleOptionChange(changeEvent) {
        this.setState({
          selectedOption: changeEvent.target.value
        });
    }

    handleAnswer(evt){
        console.log(this.state.selectedOption);
        console.log(this.state.QNAs[0].answer);
        if(this.state.selectedOption === this.state.QNAs[0].answer){
            this.state.score++;
        }
    }
    
    
    render(){
        var ProblemsandAnswers = this.state.QNAs.map((qna,index)=>(
            <div>
                <div id = "question" className = "alert alert-success">{qna.question}</div>
                <div className="radio">
                    <label>
                        <input type="radio" value={qna.answers[0]} 
                                    checked={this.state.selectedOption === qna.answers[0]} 
                                    onChange={evt=>this.handleOptionChange(evt)} />
                        {qna.answers[0]} {console.log(qna)} 
                    </label>
                </div>
                <div className="radio">
                    <label>
                        <input type="radio" value={qna.answers[1]} 
                                    checked={this.state.selectedOption === qna.answers[1]} 
                                    onChange={evt=>this.handleOptionChange(evt)} />
                        {qna.answers[1]} 
                    </label>
                </div>
                <div className="radio">
                    <label>
                        <input type="radio" value={qna.answers[2]} 
                                    checked={this.state.selectedOption === qna.answers[2]} 
                                    onChange={evt=>this.handleOptionChange(evt)} />
                        {qna.answers[2]} 
                    </label>
                </div>
                <div className="radio">
                    <label>
                        <input type="radio" value={qna.answers[3]}  
                                    checked={this.state.selectedOption === qna.answers[3]} 
                                    onChange={evt=>this.handleOptionChange(evt)} />
                        {qna.answers[3]} 
                    </label>
                </div>
            </div>
        ));
        return(
            <div id = "quiz">
<<<<<<< HEAD
                <form onSubmit = {(evt)=>this.answer(evt)}>
                    <button type="submit" className="btn btn-success">
                        Sign In!
                    </button>
=======
                <form onSubmit = {(evt)=>this.handleAnswer(evt)}>
                    {ProblemsandAnswers}
                    <button className="btn btn-primary" type="submit">Save</button>
>>>>>>> 7c196de8ecba3ccbf344c68b35e29eab48c62201
                </form>
            </div>
        );
    }
}
