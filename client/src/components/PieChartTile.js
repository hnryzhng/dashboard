import React, { Component } from 'react';

// import dependencies
import Chart from 'chart.js';

class PieChartTile extends Component {
	constructor(props){

		super(props);

		this.pieChartRef = React.createRef();

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
		const currentChartRef = this.pieChartRef.current.getContext("2d");


		// define chart options
		const chartOptions = {
			// custom options

		
		};

		const chartSettings = {
			type: 'pie',
			data: {
				labels: [
					'Red',
					'Yellow',
					'Blue'
				],
				datasets: [{
					data: [10, 20, 30]
				}]
			},
			options: chartOptions
		}


		// create chart object by binding with reference and initializing with main settings
		const myPieChart = new Chart(currentChartRef, chartSettings);

		if (myPieChart === undefined || myPieChart === null) {
			console.log("this chart cannot be paired with this data");
			console.log("my pie chart error object:", myPieChart);
		}

	}

	render(){
		return(

			<div>
				<canvas className="pie-chart" ref={ this.pieChartRef }></canvas>
			</div>

		)
	}
}

export default PieChartTile;