import React, { Component } from 'react';

// import dependencies
import axios from 'axios';
import Papa from 'papaparse';
import validateSelections from '../validateSelections.js';

// import styles
import '../styles.css'

// import components
// import TileField from './TileField.js';
// import DataSourceField from './DataSourceField.js';

class TileControl extends Component {

	state = {
	    selectedTileType: "",
	    selectedColumnsArray: null,
	    dataSourceObj: null
	}

	handleTileField = (tileType) => {
		this.setState({ selectedTileType: tileType })
		console.log("TileControl selectedTileType:", tileType);

	}

	handleDataSourceField = (object, columnsArray) => {

		this.setState({ dataSourceObj: object });
		this.setState({ selectedColumnsArray: columnsArray });

	}

	sendData = () => {
	  	// sends currentDataSource and user selected tile type & col headings to create tile dataset from

	  	// TASK: if there is a currentDataSource meaning user uploaded a local file, send it; else, submit a user provided API url for data to be retrieved and processed on backend (read2json)
	  	// TASK: user can select from existing data source that will be fetched upon component mount
	  	
	  	console.log('send data');
		
	  	var { selectedTileType, dataSourceObj, selectedColumnsArray } = this.state;
	  	console.log("sendData selectedTileType:", selectedTileType);
	  	console.log("sendData dataSourceObj:", dataSourceObj);

	  	var { data, name, id, description } = dataSourceObj;

		const baseUrl = 'http://localhost:3001';

	  	if (selectedTileType.length === 0 && dataSourceObj === null) {
	  		console.log("error: can't send data");
	  		return
	  	}

		const record = {
			selectedTileType: selectedTileType,
			objectsArray: data,
			selectedColumnsArray: selectedColumnsArray,
			dataPath: name,	// TASK: should change 
			dataID: id,	//this.state.currentDataSourceID;
			dataName: name,
			dataDescription: description
		}

		// handle updates to list; eventually, only do so if post response success
		this.props.handleListsUpdates(selectedTileType, dataSourceObj);

		// send POST request
		axios.post(`${baseUrl}/api/processData`, record)
			.then(response => response.data)
			.then(d => () => {
				// console.log(d);

				// TASK BOOKMARK: if (d.success === true)

				// pass data to App component's handleListsUpdates method
				// this.props.handleListsUpdates(selectedTileType, dataSourceObj);
			})
			.catch( err => console.log('error:', err));
	}

	handleSubmit = (event) => {
		// onClick of Submit button, sends data to backend if all fields pass validation

		// refer to TileField component's handleListsUpdates method

		event.preventDefault();

	  	// TASK BOOKMARK 
	  	// validate all fields to make sure can send, maybe in separate method
	  	// maybe put in separate module file if works

	  	var { selectedTileType, selectedColumnsArray, dataSourceObj } = this.state;
	  	const dataset = dataSourceObj.data;

	  	// console.log("handlesubmit selectedColumnsArray:", selectedColumnsArray);



	  	// TASK BOOKMARK
	  	// validateSelections( selectedTileType, selectedColumnsArray, dataset );
	  	this.sendData();

	  	// const validated = validateSelections(this.state.selectedTileType, this.state.selectedColumnsArray, this.state.dataSourceObj.data);
		// if (validated) {
		// set state of dataSourceObj.data with cleaned dataset from validateSelections
		// this.sendData()  

		
		// } else {
		// 	console.log("cannot send data");
		// 	return
		// }

	}

	render() {

		let dataSourceField;
		let submitButton; 
		if (this.state.selectedTileType.length > 0) {
			dataSourceField = <DataSourceField { ...this.state } handleDataSourceField={ this.handleDataSourceField }/>;
		}

		if (this.state.selectedTileType.length > 0 && this.state.dataSourceObj !== null) {
			submitButton = 	<button className="btn btn-primary" onClick={ this.handleSubmit }> SUBMIT </button>

		}

		return(
			<div id="tile-control">

				<TileField { ...this.state } tilesList={ this.props.tilesList } handleTileField={ this.handleTileField }/>

				{ dataSourceField }

				{ submitButton }

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

class DataSourceField extends Component {

    state = {
    	selectedFile: null,
    	currentDataSource: null,
    	currentDataSourceHeadings: [],
    	selectedColumnsArray: {}
    }

    renderDataDisplay = () => {
    	// TASK BOOKMARK
    	// maybe replace columns dropdown in the future
    	// reference: create HTML table from parsed csv: https://www.js-tutorials.com/javascript-tutorial/reading-csv-file-using-javascript-html5/
    }

    updateDataStates = (results) => {

    	const parsedData = results.data;
    	console.log('papa parsed data source results:', results);
    	
    	const dataSourceHeadings = Object.keys(parsedData[0]);
    	// hashedID = hashContent function;	// TASK BOOKMARK: use content hash to create data source id
    	
    	// TASK BOOKMARK: validate whether selected columns can be used to create target tile type chart

    	this.setState({ currentDataSource: parsedData });
    	this.setState({ currentDataSourceHeadings: dataSourceHeadings });	// set headings in state to be passed down to rendering of columns display
    	// currentDataSourceID: "",	// TASK: use content hash to create data source id; OR JUST DO SO IN SENDTOTILECONTROL METHOD
		
		// TASK BOOKMARK: create HTML display of data so user can pick which column headings to create dataset from 
		// this.renderDataDisplay() to replace Columns Dropdown component in the future?	


    }

    handleFileUpload = (event) => {
    	event.preventDefault();

    	// TASK: refer to addDataSource in former App component

    	var file = event.target.files[0];
    	this.setState({ selectedFile: file });

    	// convert csv to JSON
    	Papa.parse(file, {
    		header: true,
    		complete: this.updateDataStates
    	})
    }

    handleSelectedColumns = (columnOne, columnTwo) => {

    	var selectedColumnsObj = {
    							"x": columnOne,
    							"y": columnTwo
    						};
    	this.setState({ selectedColumnsArray: selectedColumnsObj }, () => { this.sendToTileControl() } );

    }

    sendToTileControl = () => {
    	var dataSourceObj = {
	    	data: this.state.currentDataSource,
	    	id: "test_id",	//this.state.currentDataSourceID
	    	name: this.state.selectedFile.name,
	    	description: "test_description",
	    	headings: this.state.currentDataSourceHeadings
	    	// selectedColumnsArray: this.state.selectedColumnsArray,
    	}

		// send to object to parent component TileControl
    	this.props.handleDataSourceField(dataSourceObj, this.state.selectedColumnsArray);

    }

	render() {

		let columnsDropdown;
		if (this.state.currentDataSourceHeadings.length > 0) {
			columnsDropdown = <ColumnsDropdown headings={ this.state.currentDataSourceHeadings } handleSelectedColumns={ this.handleSelectedColumns }/>
			// console.log("currentDataSourceHeadings:", this.state.currentDataSourceHeadings)
		}

		return(
			<div>

				<form className="form-inline">
					<div className="form-group">
						<input type="file" id="uploadedFile" className="form-control" placeholder="upload your data source" onChange={ this.handleFileUpload } />
					</div>
				</form>

				{ columnsDropdown }

			</div>
		);
	}
}

class ColumnsDropdown extends Component {

	state = {
		columnOne: "",
		columnTwo: ""
	}

	componentDidMount() {
		// set default column values from dataSource headings
		const colOne = this.props.headings[0];
		const colTwo = this.props.headings[1];
		this.setState({ columnOne: colOne}, () => {
			this.setState({ columnTwo: colTwo }, () => {
				this.sendToParent();	// send default columns to DataSourceField 
			});		
		});
	}

	sendToParent = () => {
		var { columnOne, columnTwo } = this.state;

		// TASK: if validation not passed, hides add or submit button

		// validation: columns cannot be empty
		if (columnOne.length === 0 && columnTwo.length === 0) {
			console.log("columns cannot be empty");	
			alert("columns cannot be empty");
			return
		}

		// validation: columns cannot be the same
		if (columnOne === columnTwo) {
			console.log("columns cannot be the same");
			alert("columns cannot be the same");
			return
		}

		console.log(`column one: ${columnOne}, columnTwo: ${columnTwo}`);
		this.props.handleSelectedColumns(columnOne, columnTwo);	
	}


	render() {

		// console.log("columns dropdown this.props.headings:", this.props.headings);

		return(
			<div id="select-column-dropdown">
				<select id="column-one" value={ this.state.columnOne } onChange={ (event) => { this.setState({ columnOne: event.target.value }, () => { this.sendToParent() }) } }>

					{
						this.props.headings.map((heading, index) => {
							return(<option key={ index } value={ heading }> { heading } </option>)
						})
					}

				</select>

				<select id="column-two" value={ this.state.columnTwo } onChange={ (event) => { this.setState({ columnTwo: event.target.value }, () => { this.sendToParent() }) } } >

					{
						this.props.headings.map((heading, index) => {
							return(<option key={ index } value={ heading }> { heading } </option>)
						})
					}

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

export default TileControl;