import React, { Component } from 'react';

// import dependencies
import Chart from 'chart.js';

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

		
		};

		const chartSettings = {
			type: 'line',
			data: {
			    labels: ["Jan", "Feb", "March", "April", "May", "June"],
			    datasets: [
			    	{
			    		label: "Company Revenue from Jan-June 2019",
			    		fill: false,
			    		borderColor: 'rgba(0,133,220,1)',
			    		pointBackgroundColor: 'rgba(0,133,220,1)',
			    		pointBorderWidth: 3,
			        	data: [50, 40, 45, 70, 30, 50]
			    	}
			    ]
			},
			options: chartOptions
        };


		// create chart object by binding with reference and initializing with main settings
		const myLineChart = new Chart(currentChartRef, chartSettings);

		if (myLineChart === undefined || myLineChart === null) {
			console.log("this chart cannot be paired with this data");
			console.log("mylinechart error object:", myLineChart);
		}

	}



	render(){

		return(
			<div>
				<canvas className="line-chart" ref={ this.lineChartRef }></canvas>
			</div>
		)

	}

}

/**

// Define prop types sent to this component


**/


export default LineChartTile;