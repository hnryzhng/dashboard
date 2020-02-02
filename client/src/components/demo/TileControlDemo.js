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
			<div className="container" id="tile-control-container">

				<div className="row" id="tile-control-text-row">
					<p>This demo allows you to add tiles of selected types from the dropdown menu.</p>
				</div>

				<div className="row" id="tile-control-row">
					
					<TileField { ...this.state } tilesList={ this.props.tilesList } handleTileField={ this.handleTileField }/>

					<SubmitButton handleSubmit={ this.handleSubmit } />

				</div>	
				
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
			
          <select className="col-md-6" id="tile-type-dropdown" onChange={ this.selectType } >
            <option>Select Tile</option>
            <option value="bar">Bar Chart</option>
            <option value="line">Line Chart</option>
            <option value="pie">Pie Chart</option>
            <option value="scatter">Scatter Plot</option>
          </select>

		)
	}
}

class SubmitButton extends Component {
	render() {
		return(
			<button className="btn btn-success col-md-2" onClick={ this.props.handleSubmit }> Add to Display </button>
		)
	}
}


export default TileControlDemo;