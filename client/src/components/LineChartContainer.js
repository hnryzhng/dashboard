import React, { Component } from 'react';
import axios from 'axios';

// import components
import LineChartTile from './LineChartTile.js'

class LineChartContainer extends Component {

	// container for fetching and updating data
	// tile configurations

	render(){
		return(

			<div className="line-chart-container">
				<LineChartTile />
			</div>


		)
	}

}

/**

// Define prop types sent to this component


**/

export default LineChartContainer;