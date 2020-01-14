import React, { Component } from 'react';
import axios from 'axios';

// import components
import BarChartTile from './BarChartTile.js'

class BarChartContainer extends Component {

	// container for fetching and updating data
	// tile configurations

	render(){
		return(

			<div className="bar-chart-container">
				<BarChartTile />
			</div>


		)
	}

}

/**

// Define prop types sent to this component


**/

export default BarChartContainer;