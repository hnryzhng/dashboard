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

		//this.drawChart();		
	}

	componentDidUpdate() {
		// executes upon each update

		//this.drawChart();
	}

	drawChart = () => {
		// select DOM reference to this component
		const currentChartRef = this.lineChartRef.current.getContext("2d");

		// define chart options
		const chartOptions = {
			// custom options
		};

		// define main chart settings
		const chartSettings = {
			type: "line", 
			data: {
				datasets: [
					{
						label: 'TEST',
						data: [50, 60, 70],

					}
				]
			},
			options: chartOptions
		}

		// create chart object by binding with reference and initializing with main settings
		const chartObject = new Chart({ currentChartRef, chartSettings });

		return chartObject;

	}



	render(){

		this.drawChart();

		return(

			<div>

				<p> LineChartTile!! </p>

				<Tile className="tile">

					<canvas id="line-chart" ref={ this.lineChartRef } />

				</Tile>

			</div>

		)

	}

}

/**

// Define prop types sent to this component


**/


export default LineChartTile;