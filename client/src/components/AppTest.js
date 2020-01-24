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
  		dataSourceID: dataSourceObj.id
  	}

  	// add records to respective lists 
  	const newTilesList = this.state.tilesList.push(tileObj);
  	this.setState({ tilesList: newTilesList}, console.log("new tiles list:", this.state.tilesList));

  	const newDataSourcesList = this.state.dataSourcesList.push(dataSourceObj);
  	this.setState({ dataSourcesList: newDataSourcesList }, console.log("new data sources list:", this.state.dataSourcesList));

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

          { 

            tilesList.map((tile, index) => {
                  return(<Tile key={ tile.tileID } tileType={ tile.tileType } dataSource={ tile.dataSourceID } />)
            })

          }

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
		

	  	// TASK BOOKMARK: validate all fields to make sure can send

		const baseUrl = 'http://localhost:3001';
	  	console.log('send data');

		const record = {
			selectedTileType: this.state.selectedTileType,
			objectsArray: this.state.dataSourceObj.data,
			selectedColumnsArray: this.state.dataSourceObj.selectedColumnsArray,
			dataPath: this.state.dataSourceObj.name,	// TASK: should change 
			dataID: this.state.dataSourceObj.ID,	//this.state.currentDataSourceID;
			dataName: this.state.dataSourceObj.name,
			dataDescription: this.state.dataSource.description
		}

		// send POST request
		axios.post(`${baseUrl}/api/processData`, record)
			.then(response => response.data)
			.then(data => data)
			.catch( err => console.log('error:', err));
	}

	handleSubmit = () => {
		// onClick of Submit button, sends data to backend if all fields pass validation

		// refer to TileField component's handleListsUpdates method

		// BOOKMARK
		this.sendData();

		// pass data to App component's handleListsUpdates method
		this.props.handleListsUpdates(this.state.tileType, dataSourceObj)

	}

	render() {

		let dataSourceField;
		let submitButton; 
		if (this.state.selectedTileType.length > 0) {
			dataSourceField = <DataSourceField { ...this.state } handleDataSourceField={ this.handleDataSourceField }/>;
		}

		return(
			<div>

				<TileField { ...this.state } tilesList={ this.props.tilesList } handleTileField={ this.handleTileField }/>

				{ dataSourceField }

				<button className="btn btn-primary" onClick={ this.handleSubmit }>
					SUBMIT OR ADD TILE
				</button>


			</div>
		)
	}

}

class TileField extends Component {

	selectType = (event) => {
		event.preventDefault();

		var tType = event.target.value;
		// console.log("tile field selected type:", tType);

		// send to TileControl parent component 
		this.handleTileField(tType);	
	}

	addTileOld = () => {
		// add tile to tilesList

		var tType = this.state.selectedTileType;
		var tilesList = this.props.tilesList;
		var dID = this.props.currentDataSourceID;

		// TASK: BOOKMARK
		// check to see if selected tile type can be paired with selected data source
		// if tile type in dataSource db record object's forTileTypes array

		// TASK: limits per user?

		// validation: check to see if tile with same type and data source already exists
		for (var i=0; i<tilesList.length; i++) {
		  if (tType === tilesList[i].tileType && dID === tilesList[i].dataSourceID) {
		    console.log("Tile of same type and data source already exists");
		    return
		  }
		}

		// validation: if both selected tile type and data source id are not empty strings
		if (tType.length > 0 && dID.length > 0) {

		  let tID;
		  // TASK: create UUID for particular user? for now, increment based on preceding tile id in tilesList
		  if (tilesList.length > 0) {
		    tID = tilesList[tilesList.length-1].tileID;  // last tile ID in list
		  } else {
		    tID = 0;
		  }

		  

		  var tileObject = {
		    tileID: (tID+1), // TASK temporary: create UUID for particular user? for now, increment based on preceding tile id in tilesList        
		    tileIndex: null,	// 
		    tileType: tType,
		    dataSourceID: dID
		  }

		  console.log("tile object:", tileObject);




		  // generate dataset in backend for particular tile based on user selection of columns or other feature 
		  // addTile -> addDataSource -> handleListsUpdates: send data path with user selected columns (e.g., selected headings from csv array)
		  
		  // TASK: display addDataSource fields only after selecting tile type

		  // <TileControl> => <TileField /> => <DataSourceField /> => <Submit onClick={ this.sendData() } />

		  // if successfully stored in db, then... 
		  // add tile object to list
		  tilesList.push(tileObject);
		  this.setState({ tilesList: tilesList })
		  console.log("tiles list:", tilesList);

		  // TASK: send tiles list back up to parent
		  this.props.handleTileField(tileObject);


		}

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
    	// currentDataSourceID: "",
    	// currentDataSourceName: "",
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
    	// console.log('papa parsed data source results:', results);
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

    	// addDataSource in former App component

    	var file = event.target.files[0];
    	this.setState({ selectedFile: file });

    	Papa.parse(file, {
    		header: true,
    		complete: this.updateDataStates
    	})
    }

    handleSelectedColumns = (columnOne, columnTwo) => {

    	var selectedColumns = [columnOne, columnTwo];
    	this.setState({ selectedColumnsArray: selectedColumns });
    	this.sendToTileControl();

    }

    sendToTileControl = () => {
    	var dataSourceObj = {
	    	data: currentDataSource,
	    	id: "test_id",	//this.state.currentDataSourceID
	    	name: selectedFile.name,
	    	description: "test_description",
	    	headings: this.state.currentDataSourceHeadings,
	    	selectedColumnsArray: this.state.selectedColumnsArray,
    	}

		// send to object to parent component TileControl
    	this.props.handleDataSourceField(dataSourceObj);

    }

	render() {
		return(
			<div>

				<form className="form-inline">
					<div className="form-group">
						<input type="file" id="uploadedFile" className="form-control" placeholder="upload your data source" onChange={ this.handleFileUpload } />
						<button type="submit" id="fileUploadSubmit" className="btn btn-primary">submit file</button>
					</div>
				</form>

				<ColumnsDropdown headings={ this.state.currentDataSourceHeadings } />

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
		// set default column values from DataSource headings
		const colOne = this.props.headings[0];
		const colTwo = this.props.headings[1];
		this.setState({ columnOne: colOne});
		this.setState({ columnTwo: colTwo });
	}

	sendToParent = () => {
		if (this.state.columnOne > 0 && this.state.columnTwo.length > 0) {
			this.props.handleSelectedColumns(columnOne, columnTwo);	
		}
	}


	render() {
		return(
			<div id="select-column-dropdown">
				<select id="column-one" value={ this.state.columnOne } onChange={ (event) => { this.setState({ columnOne: event.target.value }, () => { this.sendToParent }) } }>

					{
						this.props.headings.map((heading, index) => {
							return <option key={ index } value={ heading }> { heading } </option>
						});
					}

				</select>

				<select id="column-two" value={ this.state.columnTwo } onChange={ (event) => { this.setState({ columnTwo: event.target.value }, () => { this.sendToParent }) } } >

					{
						this.props.headings.map((heading, index) => {
							return <option key={ index } value={ heading }> { heading } </option>;
						});
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
			dataID: this.props.dataSourceObj.ID,	//this.state.currentDataSourceID;
			dataName: this.props.dataSourceObj.name,
			dataDescription: this.props.dataSource.description
		}

		// send POST request
		axios.post(`${baseUrl}/api/processData`, record)
			.then(response => response.data)
			.then(data => data)
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
