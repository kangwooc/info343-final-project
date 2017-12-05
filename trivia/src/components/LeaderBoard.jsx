import React, { Component } from 'react';
import { HorizontalBar } from 'react-chartjs-2';  //https://github.com/jerairrest/react-chartjs-2
import Timer from "react.timer"; // https://github.com/rogermarkussen/react.timer


const names = ["Dave", "Sally", "Bob", "Dave", "Sally", "Bob", "Dave", "Sally", "Bob", "Dave"];
const scores = [8, 3, 6, 8, 3, 6, 8, 3, 6, 8];
//const colors = ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)", "rgba(255, 206, 86, 0.6)"];

export default class LeaderBoard extends Component {
    constructor(props){
        super(props);
        this.state = {
            chartData:props.chartData
        }
    }

    static defaultProps = {
        displayTitle: true,
        //displayLegend: false,
    }

    componentWillMount(){
        this.getChartData();
    }
    
    // Create a random color for each bar - might be unneccesary or should live with player creation
    makeRandomColor(){
        var color = "";
        while (color.length < 7) {
          color += (Math.random()).toString(16).substr(-6).substr(-1)
        }
        return "#" + color;
    }

    getChartData(){
        this.setState({
            chartData: {
                // labels - array that houses player names
                labels: names,
                datasets: [
                    {
                    label: 'Score',
                    // data - array of player scores
                    data: scores,
                    // backgroundColor - Array of color values assigned to players - COULD THIS BE CREATED AND STORED AT USER CREATION TIME?
                    // backgroundColor: colors
                    }
                ]
            }
        });
    }

    render(){
        return (
            <div className="container leaderboard">
                <div className="chart">
                    <HorizontalBar
                        data={this.state.chartData}
                        width={75}
                        height={50}
                        options={{
                            //maintainAspectRatio: true,
                            title:{
                                display: this.props.displayTitle,
                                text:'Leaderboard',
                                fontSize: 25
                            },
                            legend:{
                                display: this.props.displayLegend,
                                position: this.props.legendPosition
                            },
                            scales: {
                                yAxes: [{
                                barPercentage: 0.9,
                                gridLines: {
                                    display: false
                                }
                                }],
                                xAxes: [{
                                gridLines: {
                                    zeroLineColor: "black",
                                    zeroLineWidth: 2,
                                },
                                // Ticks should vary based on day/week/overall
                                // Day min:0, max:10, stepSize: 1
                                // Week min:0, max:70, stepSize: 7
                                // Overall min:0, max: highest score, stepSize: highest score / 10
                                ticks: {
                                    min: 0,
                                    max: 10,
                                    stepSize: 1
                                }
                                }]
                            },
                            layout: {
                                padding: {
                                    left: 50,
                                    right: 50,
                                    top: 0,
                                    bottom: 0
                                }
                            }
                        }}
                        />
                    </div>
                {/* <div class="row justify-content-around">
                    <div>
                        <button type="button" class="col btn btn-info btn-sm">Daily</button>
                    </div>
                    <div>
                        <button type="button" class="col btn btn-info btn-sm">Weekly</button>
                    </div>
                </div> */}
            </div>
        )
    }
}