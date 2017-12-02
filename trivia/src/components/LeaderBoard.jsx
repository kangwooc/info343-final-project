import React, { Component } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
//const names = ["dave", "sally", "bob"];
//const scores = [8, 3, 6];

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
    
    // Create a random color for each bar
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
                labels: ['Dave', 'Tina', 'Will', 'Choi', 'Nelson', 'Jacob'],
                datasets: [
                    {
                    label: 'Score',
                    // data - array of player scores
                    data: [
                        8,
                        7,
                        4,
                        9,
                        9,
                        5
                    ],
                    // backgroundColor - Array of random color values assigned to players - COULD THIS BE CREATED AND STORED AT USER CREATION TIME?
                    backgroundColor:[
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(255, 99, 132, 0.6)'
                    ]
                    }
                ]
            }
        });
    }

    render(){
        return (
            <div className="chart">
            <HorizontalBar
                data={this.state.chartData}
                width={100}
                height={50}

                options={{
                    // maintainAspectRatio: false,
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
        )
    }
}