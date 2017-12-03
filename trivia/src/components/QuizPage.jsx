import React, {Component} from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export default class QuizPageView extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            checked: false,
            API_KEY: "https://opentdb.com/api.php?amount=10&token=",
            token: undefined,
            qna:[],
            time:""
        };
        
    }
    
    componentWillMount(){
        this.authUnsub= firebase.auth().onAuthStateChanged((user)=>{
            this.setState({currentUser:user})
        });
    }

    componentWillUnMount(){
        this.authUnsub();
    }

    componentDidMount(){
        let TOKEN_REQUEST = "https://opentdb.com/api_token.php?command=request";
        fetch(TOKEN_REQUEST)
            .then(response => response.json())
            .then(data =>this.setState({token:data.token}))
            .catch(err => console.error(err));
        console.log(this.state.token);
    }
    
    componentDidUpdate(){
        fetch(this.state.API_KEY+this.state.token)
            .then(response => response.json())
            .then((data)=>{
                data.results.forEach((elem)=>{
                    this.state.questions.push(elem.question);
                })
            })
        .catch(err => console.error(err));
        console.log(this.state.API_KEY+this.state.token);
        console.log(this.state.token)
        console.log(this.state.questions);
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

    render(){
        console.log(this.state.API_KEY+this.state.token);
        console.log(this.state.token)
        console.log(this.state.questions);
        return(
            <div id = "quiz">
                <form onSubmit = {(evt)=>this.handleAnswer(evt)}>
                    
                </form>
            </div>
        );
    }
}

