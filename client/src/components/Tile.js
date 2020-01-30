import React, { Component } from 'react';

// import components
import LineChartContainer from './LineChartContainer.js';

import BarChartContainer from './BarChartContainer.js';

class Tile extends Component {

	// TASK: maybe in future, don't need component files for each type of chart
	// but a general Chart Tile that renders based on given tile type and appropriate (validated?)
	// corresponding tile data/options
	state = {
		'line': <LineChartContainer />,
		'bar': <BarChartContainer />
	}

	render(){
		/*

				TASK: create an associative array mapping tile types to their respective component files 
				
	

				<div className="tile">

					<LineChartContainer />

				</div>

				<div className="tile">

					<BarChartContainer />

				</div>
		*/

		// console.log("Tile component tile type component", this.props.tileType);
		// console.log("Tile component:", this.state[this.props.tileType]);
		return(

			<div className="tile col-md shadow bg-white">

				{ this.state[this.props.tileType] }


			</div>

		)

	}

}


export default Tile;
