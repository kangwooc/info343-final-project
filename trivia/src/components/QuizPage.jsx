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
            questions:[],
            time:""
        };
        
    }
    
    componentWillMount(){
        this.authUnsub= firebase.auth().onAuthStateChanged((user)=>{
            this.setState({currentUser:user})
        });

        let TOKEN_REQUEST = "https://opentdb.com/api_token.php?command=request";
        
        fetch(TOKEN_REQUEST)
            .then(response => response.json())
            .then(data =>this.setState({token:data.token}))
            .catch(err => console.error(err));
        console.log(this.state.token);

        // var measureTime = window.setInterval(function(){
        //     time = minute + " m "+second+" s";
        //     document.getElementById("time").innerHTML = time;
        //     second++;
        //     if(second === 60){
        //         second = 0;
        //         minute++;
        //     }
        // },1000); 
            
    }

    componentWillUnMount(){
        this.authUnsub();
    }
    componentDidMount(){
        fetch(this.state.API_KEY+this.state.token)
            .then(response => response.json())
            .then((data)=>{
                console.log(data);
                data.results.forEach((elem)=>{
                    
                })
            })
        .catch(err => console.error(err));
    }

    changeDate(){
        let day = new Date();
        let n = day.getUTCDay();
        console.log(n);
        console.log(day.getUTCDay());
        return ( n !== day.getUTCDay());
    }

    render(){
        
        return(
            <div id = "quiz">
                <div className = "">
                    
                </div>
            </div>
        );
    }
}

