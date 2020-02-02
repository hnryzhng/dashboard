import React, { Component } from 'react';

import BubbleChartTile from './BubbleChartTile.js';

class BubbleChartContainer extends Component {

	// container for fetching and updating data
	// tile configurations

	render() {
		return(

			<div className="bubble-chart-container">
				<BubbleChartTile />
			</div>

		)
	}

}

/**

// Define prop types sent to this component


**/

export default BubbleChartContainer;