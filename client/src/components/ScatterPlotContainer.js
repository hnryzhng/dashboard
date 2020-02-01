import React, { Component } from 'react';
import axios from 'axios';

import ScatterPlotTile from './ScatterPlotTile.js';

class ScatterPlotContainer extends Component {

	// container for fetching and updating data
	// tile configurations

	render() {
		return(

			<div className="scatter-plot-container">
				<ScatterPlotTile />
			</div>
		)
	}

}

/**

// Define prop types sent to this component


**/


export default ScatterPlotContainer;