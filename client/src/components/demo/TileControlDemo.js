import React, { Component } from 'react';

// import dependencies
import Papa from 'papaparse';

// import styles
import '../../styles.css'

// import components
// import TileField from './TileField.js';
// import DataSourceField from './DataSourceField.js';

class TileControlDemo extends Component {

	state = {
	    selectedTileType: ""
	}

	handleTileField = (tileType) => {
		this.setState({ selectedTileType: tileType })
		console.log("TileControl selectedTileType:", tileType);

	}

	handleSubmit = (event) => {

		event.preventDefault();

	  	var { selectedTileType } = this.state;

	  	var dataSourceObj = [{}];	// dummy variable for demo

		// handle updates to list; eventually, only do so if post response success
		this.props.handleListsUpdates(selectedTileType, dataSourceObj);

	}

	render() {

		return(
			<div>

				<TileField { ...this.state } tilesList={ this.props.tilesList } handleTileField={ this.handleTileField }/>

				<button className="btn btn-primary" onClick={ this.handleSubmit }> SUBMIT </button>

			</div>
		)
	}

}

class TileField extends Component {

	selectType = (event) => {
		event.preventDefault();

		var tType = event.target.value;
		console.log("tile field selected type:", tType);

		// send to TileControl parent component 
		this.props.handleTileField(tType);	
	}

	render() {
		return(
			<div>

	          <select id="tile-type" onChange={ this.selectType } >
	            <option>Add Tile</option>
	            <option value="bar">Bar Chart</option>
	            <option value="line">Line Chart</option>
	            <option value="pie">Pie Chart</option>
	            <option value="scatter">Scatter Plot</option>
	          </select>

			</div>

		)
	}
}

class Submit extends Component {

	render() {
		return(

			<button className="btn btn-primary">
				SUBMIT
			</button>

		)
	}
}

export default TileControlDemo;