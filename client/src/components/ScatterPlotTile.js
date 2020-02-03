import React, { Component } from 'react';

// import dependencies
import Chart from 'chart.js';

class ScatterPlotTile extends Component {
	constructor(props){

		super(props);

		this.state = {
			dataArray: [],
			numPoints: 10,
			xMax: 65,
			yMax: 24
		}

		this.scatterPlotRef = React.createRef();

	}

	componentDidMount() {
		// executes after component renders

		if (this.state.dataArray.length === 0) {
			this.drawChart();
		}

	}

	componentDidUpdate(prevProps, prevState) {
		// executes upon each update

		if (prevState.dataArray !== this.state.dataArray) {
			this.drawChart();
		}

	}

	generateDataPoints = () => {

		var dArray = this.state.dataArray;

		for (var i=0; i<this.state.numPoints; i++) {

			var coords = {
				x: Math.round(Math.random() * Math.floor(this.state.xMax)),
				y: Math.round(Math.random() * Math.floor(this.state.yMax))
			}

			dArray.push(coords);

		}

		console.log("scatter plot data array:", dArray);

		this.setState({ dataArray: dArray });
	}

	drawChart = () => {
		// select DOM reference to this component
		const currentChartRef = this.scatterPlotRef.current.getContext("2d");


		// generate random data points
		this.generateDataPoints();	// assign this.state.dataArray to chart settings below

		// define chart options
		const chartOptions = {

			scales: {
			    xAxes: [{
			        type: 'linear',
			        position: 'bottom',
			        scaleLabel: {
			        	display: true,
			        	labelString: 'Age'
			        }
			    }],
			    yAxes: [{
			    	scaleLabel: {
			    		display: true,
			    		labelString: 'Hours spent on video streaming platforms'
			    	}
			    }]
			}

		};

		const chartSettings = {
			type: 'scatter',
			data: {
			    datasets: [{
			    	label: 'Hours spent watching streaming video by age',
			        pointBackgroundColor: '#02383c',
			        pointHoverBackgroundColor: '#ed5107',
			        pointRadius: 6,
			        data: this.state.dataArray
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
