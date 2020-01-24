// AppTest.js


import React, { Component } from 'react';

// import dependencies
import axios from 'axios';
import Papa from 'papaparse';

// import styles
import '../styles.css'

// import components
import Tile from './Tile.js';
import LineChartContainer from './LineChartContainer.js';
import { linedata, bardata } from "./mockdata.js";

class App extends Component {

  // top-level configurations: tile layout/arrangement

  state = {
  	user: null,
  	loggedIn: null,
    tilesList: [],  // [{ str tile_id, num tile_index, str tile_type, str dataSource_id, array generated_dataset, (obj tileElement) }]
    dataSourcesList: [], // [{ str dataSource_id, str name }]
  }

  componentDidMount() {

    // if logged in
    // fetch user tiles list and data sources list from user db

  }

  handleListsUpdates = (tType, dataSourceObj) => {

  	// update tiles and dataSources lists
    
    // TASK: limits per user?

  	const dID = dataSourceObj.id;
  	var tilesList = this.state.tilesList;
  	console.log("handleListsUpdates tilesList:", tilesList);
  	console.log("tType:", tType);
  	console.log("dataSourceObj:", dataSourceObj);

    // validation: check to see if tile with same type and data source already exists
    for (var i=0; i<tilesList.length; i++) {
      if (tType === tilesList[i].tileType && dID === tilesList[i].dataSourceID) {
        console.log("Tile of same type and data source already exists");
        return
      }
    }

	// create current tile index based on previous tile index in list
	let tIndex;
	if (tilesList.length > 0) {
		tIndex = tilesList[tilesList.length-1].tileIndex;  // last tile ID in list
	} else {
		tIndex = 0;
	}

  	// add tile to tilesList
  	const tileObj = {
  		tileID: "random_tile_id",	// TASK: use UUID? or just let id be generated upon save to db?
  		tileIndex: tIndex,
  		tileType: tType,
  		dataSourceID: dID
  	}

  	// add records to respective lists 
  	const newTilesList = tilesList.concat(tileObj);
  	this.setState({ tilesList: newTilesList }, () => { console.log("new tiles list:", this.state.tilesList) } );

  	const newDataSourcesList = this.state.dataSourcesList.concat(dataSourceObj);
  	this.setState({ dataSourcesList: newDataSourcesList }, () => { console.log("new data sources list:", this.state.dataSourcesList) } );

  }

  removeTile = () => {
    // delete tile from tilesList

  }

  reorderTiles = () => {
    // rearrange tiles in tilesList with drag and drop implementation

  }

  getTileData = () => {
    // return tile data given data source id associated with tile

  }

  render() {

    // console.log("selected tile type:", this.state.selectedTileType);

    // console.log("selected data source:", this.state.currentDataSourceID);
    
    let tilesDisplay;
    const tilesList = this.state.tilesList;
    if (tilesList.length > 0) {
      tilesDisplay =  tilesList.map((tile, index) => {
                  return(<Tile key={ tile.tileID } tileType={ tile.tileType } dataSource={ tile.dataSourceID } />)
                });
    }

    return (
      <div>

      	<TileControl { ...this.state } handleListsUpdates={ this.handleListsUpdates }/>


        <div id="tiles-container">

          { tilesDisplay }

        </div>

      </div>

    );
  }

}

class TileControl extends Component {

	state = {
	    selectedTileType: "",
	    dataSourceObj: null
	}

	handleTileField = (tileType) => {
		this.setState({ selectedTileType: tileType })
		console.log("TileControl selectedTileType:", tileType);

	}

	handleDataSourceField = (object) => {

		this.setState({ dataSourceObj: object });

	}


	sendData = () => {
	  	// sends currentDataSource and user selected tile type & col headings to create tile dataset from

	  	// TASK: if there is a currentDataSource meaning user uploaded a local file, send it; else, submit a user provided API url for data to be retrieved and processed on backend (read2json)
	  	// TASK: user can select from existing data source that will be fetched upon component mount
		
		const baseUrl = 'http://localhost:3001';
	  	console.log('send data');

	  	// TASK BOOKMARK: validate all fields to make sure can send, maybe in separate method
	  	if (this.state.selectedTileType.length === 0 && this.state.dataSourceObj === null) {
	  		console.log("error: can't send data");
	  		return
	  	}

		const record = {
			selectedTileType: this.state.selectedTileType,
			objectsArray: this.state.dataSourceObj.data,
			selectedColumnsArray: this.state.dataSourceObj.selectedColumnsArray,
			dataPath: this.state.dataSourceObj.name,	// TASK: should change 
			dataID: this.state.dataSourceObj.id,	//this.state.currentDataSourceID;
			dataName: this.state.dataSourceObj.name,
			dataDescription: this.state.dataSourceObj.description
		}

		// send POST request
		axios.post(`${baseUrl}/api/processData`, record)
			.then(response => response.data)
			.then(data => data)
			.catch( err => console.log('error:', err));
	}

	handleSubmit = (event) => {
		// onClick of Submit button, sends data to backend if all fields pass validation

		// refer to TileField component's handleListsUpdates method

		event.preventDefault();

		// BOOKMARK
		this.sendData();

		// pass data to App component's handleListsUpdates method
		this.props.handleListsUpdates(this.state.selectedTileType, this.state.dataSourceObj)

	}

	render() {

		let dataSourceField;
		let submitButton; 
		if (this.state.selectedTileType.length > 0) {
			dataSourceField = <DataSourceField { ...this.state } handleDataSourceField={ this.handleDataSourceField }/>;
		}

		if (this.state.selectedTileType.length > 0 && this.state.dataSourceObj !== null) {
			submitButton = 	<button className="btn btn-primary" onClick={ this.handleSubmit }> SUBMIT OR ADD TILE </button>

		}

		return(
			<div>

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
	            <option>Choose Tile Type</option>
	            <option value="bar">Bar Chart</option>
	            <option value="line">Line Chart</option>
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
    	selectedColumnsArray: []
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

    	var selectedColumns = [columnOne, columnTwo];
    	this.setState({ selectedColumnsArray: selectedColumns }, () => { this.sendToTileControl() } );    	

    }

    sendToTileControl = () => {
    	var dataSourceObj = {
	    	data: this.state.currentDataSource,
	    	id: "test_id",	//this.state.currentDataSourceID
	    	name: this.state.selectedFile.name,
	    	description: "test_description",
	    	headings: this.state.currentDataSourceHeadings,
	    	selectedColumnsArray: this.state.selectedColumnsArray,
    	}

		// send to object to parent component TileControl
    	this.props.handleDataSourceField(dataSourceObj);

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


	sendData = () => {
	  	// sends currentDataSource and user selected tile type & col headings to create tile dataset from

	  	// TASK: if there is a currentDataSource meaning user uploaded a local file, send it; else, submit a user provided API url for data to be retrieved and processed on backend (read2json)
	  	// TASK: user can select from existing data source that will be fetched upon component mount
		

	  	// TASK BOOKMARK: validate all fields to make sure can send

		const baseUrl = 'http://localhost:3001';
	  	console.log('send data');

		const record = {
			selectedTileType: this.props.selectedTileType,
			objectsArray: this.props.dataSourceObj.data,
			selectedColumnsArray: this.props.dataSourceObj.selectedColumnsArray,
			dataPath: this.props.dataSourceObj.name,	// TASK: should change 
			dataID: this.props.dataSourceObj.id,	//this.state.currentDataSourceID;
			dataName: this.props.dataSourceObj.name,
			dataDescription: this.props.dataSource.description
		}

		// send POST request
		axios.post(`${baseUrl}/api/processData`, record)
			// .then(response => response.data)
			// .then(data => console.log("data:", data))
			.catch( err => console.log('error:', err));
	}

	render() {
		return(

			<button className="btn btn-primary" onClick={ this.sendData }>
				SUBMIT OR ADD TILE
			</button>

		)
	}
}

export default App;
