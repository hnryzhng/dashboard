import React, { Component } from 'react';

// import dependencies
import Chart from 'chart.js';

class BarChartTile extends Component {
	constructor(props){

		super(props);

		this.barChartRef = React.createRef();

	}

	componentDidMount() {
		// executes after component renders

		this.drawChart();		
	}

	componentDidUpdate() {
		// executes upon each update

		this.drawChart();
	}

	drawChart = () => {
		// select DOM reference to this component
		const currentChartRef = this.barChartRef.current.getContext("2d");


		// define chart options
		const chartOptions = {
			// custom options

		
		};

		const chartSettings = {
			type: 'bar',
			data: {
			    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
			    datasets: [{
			        label: '# of Votes',
			        data: [12, 19, 3, 5, 2, 3],
			        backgroundColor: [
			            'rgba(255, 99, 132, 0.2)',
			            'rgba(54, 162, 235, 0.2)',
			            'rgba(255, 206, 86, 0.2)',
			            'rgba(75, 192, 192, 0.2)',
			            'rgba(153, 102, 255, 0.2)',
			            'rgba(255, 159, 64, 0.2)'
			        ],
			        borderColor: [
			            'rgba(255, 99, 132, 1)',
			            'rgba(54, 162, 235, 1)',
			            'rgba(255, 206, 86, 1)',
			            'rgba(75, 192, 192, 1)',
			            'rgba(153, 102, 255, 1)',
			            'rgba(255, 159, 64, 1)'
			        ],
			        borderWidth: 1
			    }]
			},
			options: {
			    scales: {
			        yAxes: [{
			            ticks: {
			                beginAtZero: true
			            }
			        }]
			    }
			}
        };


		// create chart object by binding with reference and initializing with main settings
		const myBarChart = new Chart(currentChartRef, chartSettings);

		if (myBarChart === undefined || myBarChart === null) {
			console.log("this chart cannot be paired with this data");
			console.log("my bar chart error object:", myBarChart);
		}

	}

	render(){
		return(

			<div>
				<canvas className="bar-chart" ref={ this.barChartRef }></canvas>
			</div>

		)
	}
}

export default BarChartTile;