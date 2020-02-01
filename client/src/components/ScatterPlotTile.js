import React, { Component } from 'react';

// import dependencies
import Chart from 'chart.js';

class ScatterPlotTile extends Component {
	constructor(props){

		super(props);

		this.scatterPlotRef = React.createRef();

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
		const currentChartRef = this.scatterPlotRef.current.getContext("2d");


		// define chart options
		const chartOptions = {
			// custom options

			scales: {
			    xAxes: [{
			        type: 'linear',
			        position: 'bottom'
			    }]
			}

		};

		const chartSettings = {
			type: 'scatter',
			data: {
			    datasets: [{
			        label: 'Scatter Data A',
			        data: [{
			            x: -10,
			            y: 0
			        }, {
			            x: 0,
			            y: 10
			        }, {
			            x: 10,
			            y: 5
			        }]
			    }]
			},
			options: chartOptions
		}


		// create chart object by binding with reference and initializing with main settings
		const myScatterPlot = new Chart(currentChartRef, chartSettings);

		if (myScatterPlot === undefined || myScatterPlot === null) {
			console.log("this chart cannot be paired with this data");
			console.log("my scatter plot error object:", myScatterPlot);
		}

	}

	render(){
		return(

			<div>
				<canvas className="scatter-plot" ref={ this.scatterPlotRef }></canvas>
			</div>

		)
	}
}

export default ScatterPlotTile;
