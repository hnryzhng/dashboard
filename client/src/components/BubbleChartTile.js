import React, { Component } from 'react';

// import dependencies
import Chart from 'chart.js';

class BubbleChartTile extends Component {
	constructor(props) {

		super(props);

		this.bubbleChartRef = React.createRef();

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
		const currentChartRef = this.bubbleChartRef.current.getContext("2d");

		// define chart options
		const chartOptions = {
			// custom options

		};

		const chartSettings = {
			type: 'bubble',
			data: {},
			options: chartOptions
		};

		// create chart object by binding with reference and initializing with main settings
		const myBubbleChart = new Chart(currentChartRef, chartSettings);

		if (myBubbleChart === undefined || myBubbleChart === null) {
			console.log("this chart cannot be paired with this data");
			console.log("mybubblechart error object:", myBubbleChart);
		}

	}

	render() {
		return(
			<div>
				<canvas className="bubble-chart" ref={ this.bubbleChartRef }></canvas>
			</div>
		)
	}

}

export default BubbleChartTile