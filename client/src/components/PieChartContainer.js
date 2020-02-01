import React, { Component } from 'react';
import axios from 'axios';

import PieChartTile from './PieChartTile.js';

class PieChartContainer extends Component {

	// container for fetching and updating data
	// tile configurations

	render(){
		return(

			<div className="pie-chart-container">
				<PieChartTile />
			</div>


		)
	}

}

/**

// Define prop types sent to this component


**/

export default PieChartContainer;