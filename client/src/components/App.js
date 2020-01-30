// AppTest.js


import React, { Component } from 'react';

// import dependencies
import axios from 'axios';
import Papa from 'papaparse';
import validateSelections from '../validateSelections.js';

// import styles
import '../styles.css'

// import components
import Navbar from './Navbar.js';
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

    newTilesRowsList: []
  }

  componentDidMount() {

    // if logged in
    // fetch user tiles list and data sources list from user db

  }

  getTileData = () => {
    // return tile data given data source id associated with tile

  }

  handleListsUpdates = (tType, dataSourceObj) => {

  	// update tiles and dataSources lists
    
    // TASK: limits per user?

  	const dID = dataSourceObj.id;
  	var tilesList = this.state.tilesList;
  	var dataSourcesList = this.state.dataSourcesList;
  	console.log("handleListsUpdates tilesList:", tilesList);
  	console.log("handleListsUpdates dataSourcesList:", dataSourcesList);
  	console.log("tType:", tType);
  	console.log("dataSourceObj:", dataSourceObj);

    // validation: check to see if tile with same type and data source already exists
    // for (var i=0; i<tilesList.length; i++) {
      // if (tType === tilesList[i].tileType && dID === tilesList[i].dataSourceID) {
        // console.log("Tile of same type and data source already exists");
        // return
      // }
    // }

    // validation: check if same datasource already exists
    var dataSourceExists = false;
    for (var i=0; i<dataSourcesList.length; i++) {
    	if (dataSourcesList[i].id === dID ) {
    		console.log("You've already uploaded this dataset");
    		dataSourceExists = true;
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

    if (dataSourceExists === false) {
		const newDataSourcesList = this.state.dataSourcesList.concat(dataSourceObj);
		this.setState({ dataSourcesList: newDataSourcesList }, () => { console.log("new data sources list:", this.state.dataSourcesList) } );
    }
	//console.log("new data sources list:", this.state.dataSourcesList);

  }

  removeTile = () => {
    // delete tile from tilesList

  }

  enableTileReorder = () => {
  	// activates event handlers to allow for drag and drop functionality

  }

  reorderTiles = () => {
    // rearrange tiles in tilesList with drag and drop implementation

  }

  render() {

    // console.log("selected tile type:", this.state.selectedTileType);

    // console.log("selected data source:", this.state.currentDataSourceID);
    

    // let tilesDisplay;
    // const tilesList = this.state.tilesList;
    // if (tilesList.length > 0) {
    	// calculate number of rows to be created based on num of tiles in tilesList and specified cardsInRow
    	// for every row, append tiles in tileList until cardsInRow countdown reaches 0, then create new row and repeat

      // tilesDisplay =  tilesList.map((tile, index) => {
                  // return(<Tile key={ tile.tileID } tileType={ tile.tileType } dataSource={ tile.dataSourceID } />)
                // });


   //  let tilesDisplay;
   //  const tilesList = this.state.tilesList;
   //  var newTilesRowsList = this.state.newTilesRowsList;
   //  if (tilesList.length > 0) {
   //  	// calculate number of rows to be created based on num of tiles in tilesList and specified cardsInRow
   //  	// for every row, append tiles in tileList until cardsInRow countdown reaches 0, then create new row and repeat

   //    // tilesDisplay =  tilesList.map((tile, index) => {
   //                // return(<Tile key={ tile.tileID } tileType={ tile.tileType } dataSource={ tile.dataSourceID } />)
   //              // });

   //    // for every tile whose index is even, add row, then append it and following tile.
	  // var tilesPerRow = 3;
      
   //    for (var i=0; i<tilesList.length; i++) {
	  //   console.log('---');
	  //   console.log("tilesList i:", i);
   //    	if (i%tilesPerRow===0) {
	  //     	var rowTiles = [];
	  //     	var tileObj = tilesList[i];
	  //     	console.log("tileObj:", tileObj)
	  //     	rowTiles.push(tileObj);
	  //   	console.log("rowTiles:", rowTiles);
	  //   	newTilesRowsList.push(rowTiles);
	  //   } else {
	  //   	var lastRowTiles = newTilesRowsList.pop(); 
	  //   	console.log("lastRowTiles:", lastRowTiles)	
	  //   	lastRowTiles.push(tileObj);
	  //   	newTilesRowsList.push(lastRowTiles);
	  //   }
	  //   console.log("newTilesRowsList:", newTilesRowsList);

   //    };

	  // //this.setState({ newTilesRowsList: newTilesRowsList });
   //  };

   //  var forFunction = (newTilesRowsList) => {
   //  	for (var i=0; i<newTilesRowsList.length; i++) {	
   //  		var rowArray = newTilesRowsList[i];	
   //  		console.log("newTilesRowsList i:", i);	// TASK: need to preserve state	
   //  		console.log("rowArray:", rowArray);
   //  		for (var j=0; j<rowArray.length; j++) {	
	  //   		console.log("rowArray j:", j);	// TASK: preserve state
	  //   		var tile = rowArray[j];
	  //   		return(<Tile key={ tile.tileID } tileType={ tile.tileType } dataSource={ tile.dataSourceID } />);
	  //   	}
   //  	}
   //  }

   //  // BOOKMARK: unable to render non-first tiles of each row
   //  tilesDisplay = forFunction(this.state.newTilesRowsList);


    return (
      <div>

      	<Navbar />

      	<TileControl { ...this.state } handleListsUpdates={ this.handleListsUpdates }/>

        <TilesContainer tilesList={ this.state.tilesList } />



      </div>

    );
  }

}

class TilesContainer extends Component {

	state = {
		tilesList: [],
		tilesRowsList: [],
		tilesPerRow: 3

	}

	// TASK BOOKMARK: must be re-rendered upon update;

	componentDidMount() {
		
		console.log("tiles container component did mount");

		this.createTilesRows();

	}

	componentDidUpdate(prevProps, prevState) {
		console.log("tiles container component did update");
		
		if (prevProps.tilesList !== this.props.tilesList) {
			this.createTilesRows();
		}
	}

	createTilesRows = () => {
		console.log("CREATE TILES ROWS");
		var tilesList = this.props.tilesList;
		console.log("TilesContainer tilesList:", tilesList);
		var tilesRowsList = this.state.tilesRowsList;
		var tilesPerRow = this.state.tilesPerRow;
		if (tilesList.length > 0) {
			for (var i=0; i<tilesList.length; i++) {
				if (i % tilesPerRow === 0) {
					var rowTiles = [];
					var tileObj = tilesList[i];
					console.log("tileObj:", tileObj);
					rowTiles.push(tileObj);
					console.log("rowTiles:", rowTiles);
					tilesRowsList.push(rowTiles);
				} else {
					var lastRowTiles = tilesRowsList.pop();
					console.log("lastRowTiles:", lastRowTiles);
					lastRowTiles.push(tileObj);
					tilesRowsList.push(lastRowTiles);
				}

			}

			console.log("tilesRowsList:", tilesRowsList);
			this.setState({ tilesRowsList: tilesRowsList });

		}

	}

	renderRows = () => {

		// BOOKMARK: row on grabbing state and rendering current tile in row
		
		var tilesRowsList = this.state.tilesRowsList;

		for (var i=0; i<tilesRowsList.length; i++) {
			var rowArray = tilesRowsList[i];
			console.log("tilesRowsList i:", i);
			console.log("rowArray:", rowArray);
			for (var j=0; j<rowArray.length; j++) {
				console.log("rowArray j:", j);
				return(<Row key={ i } rowArray={ rowArray } />);
				// var tileObj = rowArray[j];
				// return(<Tile key={ tileObj.tileID } tileType={ tileObj.tileType } dataSource={ tileObj.dataSourceID } />);
			}
		}
	}

	render() {
		let showRows;
		showRows = this.renderRows();
		
		return(

			

			<div>

				{ showRows }


			</div>

		)
	}


}

class Row extends Component {
	render() {

		let tileDisplay;
		tileDisplay = this.props.rowArray.map((tileObj, index) => {
						return(("tileObj:", tileObj.tileID ));
						// console.log("index:", index);
						// return(<Tile key={ tileObj.tileID } tileType={ tileObj.tileType } dataSource={ tileObj.dataSourceID } />);
					})
		return(
			<div>

				Row rowArray:
				{
					tileDisplay

				}
			
			</div>
		)
	}
}

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
	            <option>Add Tile</option>
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

export default App;
