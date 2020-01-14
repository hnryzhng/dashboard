import React, { Component } from 'react';

// import components
import LineChartContainer from './LineChartContainer.js';

import BarChartContainer from './BarChartContainer.js';

class Tile extends Component {

	render(){
		return(
			<>

				<div className="tile">

					<LineChartContainer />

				</div>

				<div className="tile">

					<BarChartContainer />

				</div>

			</>

		)

	}

}


export default Tile;
