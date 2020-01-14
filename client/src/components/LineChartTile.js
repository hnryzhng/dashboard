import React, { Component } from 'react';

// import dependencies
import Chart from 'chart.js';

// import components
import Tile from './Tile.js';


class LineChartTile extends Component {

	constructor(props) {
		
		super(props);

		this.lineChartRef = React.createRef();

	};

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
		const currentChartRef = this.lineChartRef.current.getContext("2d");


		// define chart options
		const chartOptions = {
			// custom options

			scales: {
			        yAxes: [{
			            ticks: {
			                beginAtZero: true
			            }
			        }]
			}
		
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
			options: chartOptions
        };


		// create chart object by binding with reference and initializing with main settings
		const myLineChart = new Chart(currentChartRef, chartSettings);

	}



	render(){

		return(

			<div>

				<canvas id="line-chart" ref={ this.lineChartRef }></canvas>
			


			</div>

		)

	}

}

/**

// Define prop types sent to this component


**/


export default LineChartTile;