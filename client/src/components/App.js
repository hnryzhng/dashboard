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
    selectedTileType: "",
    selectedFile: null,
    currentDataSource: null,
    currentDataSourceHeadings: [],
    currentDataSourceID: "",
    currentDataSourceName: "",
    currentDataSourceDescription: "",
    selectedColumnsArray: []
  }

  componentDidMount() {

    // if logged in
    // fetch user tiles list and data sources list from user db

  }

  addTile = () => {
    // add tile to tilesList

    var tilesList = this.state.tilesList;
    var tType = this.state.selectedTileType;
    var dID = this.state.currentDataSourceID;

    // TASK: BOOKMARK
    // check to see if selected tile type can be paired with selected data source
    // if tile type in dataSource db record object's forTileTypes array

    // TASK: limits per user?

    // check to see if tile with same type and data source already exists
    for (var i=0; i<tilesList.length; i++) {
      if (tType === tilesList[i].tileType && dID === tilesList[i].dataSourceID) {
        console.log("Tile of same type and data source already exists");
        return
      }
    }

    // if both selected tile type and data source id are not empty strings
    if (tType.length > 0 && dID.length > 0) {

      let tID;
      // TASK: create UUID for particular user? for now, increment based on preceding tile id in tilesList
      if (tilesList.length > 0) {
        tID = tilesList[tilesList.length-1].tileID;  // last tile ID in list
      } else {
        tID = 0;
      }

      // TASK: add other tile options based on user selection, possibly tile element itself?
      var tileObject = {
        tileID: (tID+1), // TASK temporary: create UUID for particular user? for now, increment based on preceding tile id in tilesList        
        tileIndex: null,	// 
        tileType: tType,
        dataSourceID: dID
      }

      console.log("tile object:", tileObject);

      // TASK BOOKMARK
      // send POST request to appropriate route
      // generate dataset in backend for particular tile based on user selection of columns or other feature 
      // create processTileData folder?

      // addTile -> addDataSource -> addTile: send data path with user selected columns (e.g., selected headings from csv array)


      // if successfully stored in db, then... 
      // add tile object to list
      tilesList.push(tileObject);
      this.setState({ tilesList: tilesList })
      console.log("tiles list:", tilesList);

    }

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

  sendData = () => {
  	console.log('send data');

  	// TASK BOOKMARK: 
  	// if there is a currentDataSource meaning user uploaded a local file, send it; else, submit a user provided API url for data to be retrieved and processed on backend (read2json)
	


  	// sends currentDataSource and user selected col headings to create tile dataset from

	const baseUrl = 'http://localhost:3001';
	const dPath = this.state.selectedFile.name;
	const currentColumns = ['linex', 'liney']	//TASK: this.state.selectedColumnsArray after user selects

	console.log('dPath:', dPath);	// example: testdata.csv
	console.log('selected file:', this.state.selectedFile);
	console.log('currentColumns:', currentColumns);

	const record = {
		selectedTileType: this.state.selectedTileType,

		objectsArray: this.state.currentDataSource,
		selectedColumnsArray: currentColumns,
		dataPath: dPath,
		dataID: 'testdataID',	//this.state.currentDataSourceID;
		dataName: "test data name",	//this.state.currentDataSourceName
		dataDescription: "test data description"	//this.state.currentDataSourceDescription defined by user
	}

	// send POST request
	axios.post(`${baseUrl}/api/processData`, record)
		.then(response => response.data)
		.then(data => data)
		.catch( err => console.log('error:', err));


  }

  renderDataDisplay = () => {

  	// TASK: create HTML table from parsed csv: https://www.js-tutorials.com/javascript-tutorial/reading-csv-file-using-javascript-html5/
    // set state for selected column headings of current data source upon user selection
	console.log('render data display');
	// have App render from this.state.currentDataSourceHeadings

  	// this.setState({ selectedColumnsArray: []}, () => { this.sendData() } );	
	this.sendData();

  }

  updateDataStates = (results) => {
		const parsedData = results.data;
		// console.log('papaparsed results:', results)

		// TASK BOOKMARK: Validate whether selected columns can be used to create the desired tile type chart? 

		this.setState({ currentDataSource: parsedData }, () => { 

			console.log('state currentDataSource:', this.state.currentDataSource);

			this.renderDataDisplay();	// create HTML display of data so user can pick which column headings to create dataset from 

		});
		this.setState({ currentDataSourceHeadings: Object.keys(this.state.currentDataSource[0]) }, () => { console.log('state currentDataSourceHeadings:', this.state.currentDataSourceHeadings) });
		this.setState({ currentDataSourceName: this.state.selectedFile.name});
		
		// TASK BOOKMARK: use content hash to create data source id
		// hashedID = hashContent function;
		// this.setState({ currentDataSourceID: hashedID })
		// this.setState({ dataSourcesList: { ...this.state.dataSourcesList, hashedID } })
		// console.log('state currentDataSourceID:', this.state.currentDataSourceID);

  }

  addDataSource = (event) => {
    // add data source object upon user select

    event.preventDefault();

    // parse selected csv file

	const selectedFile = this.state.selectedFile;
    // console.log("uploaded file:", this.state.selectedFile);
    Papa.parse(this.state.selectedFile, {
    	header: true,
		complete: this.updateDataStates
	});

    // TASK: check if data source name for particular user already exists
    // TASK: limits per user?

  };

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


        <div id="tiles-container">

          { 

            tilesList.map((tile, index) => {
                  return(<Tile key={ tile.tileID } tileType={ tile.tileType } dataSource={ tile.dataSourceID } />)
            })

          }

        </div>

      

        <div id="userControl">
          
          <select id="tile-type" value={ this.state.selectedTileType } onChange={ (event)=>{ this.setState({ selectedTileType: event.target.value }) } }>
            <option defaultValue="choose tile type">Choose Tile Type</option>
            <option value="bar">Bar Chart</option>
            <option value="line">Line Chart</option>
          </select>

          <select id="data-source" value={ this.state.currentDataSourceID } onChange={ (event)=>{ this.setState({ currentDataSourceID: event.target.value }) } }>
            <option defaultValue="choose data source">generate list of dropdown based on tile type?</option>            
            <option value="mock-bar-data">Bar data</option>
            <option value="mock-line-data">Line data</option>
            <option value="dataSource.id" disabled> "dataSource.title" </option>
          </select>

          <button type="button" onClick={ () => { this.addTile() } }>Add Tile</button>

          <button type="button" onClick={ () => { this.addDataSource() } }>ADD DATA</button>

        </div>

        <form className="form-inline" onSubmit={ this.addDataSource }>
        	<div className="form-group">
        		<input type="file" id="uploadedFile" className="form-control" placeholder="upload your data source" onChange={ event => this.setState({ selectedFile: event.target.files[0] }) } />
        		<button type="submit" id="fileUploadSubmit" className="btn btn-primary">submit file</button>
        	</div>
        </form>


      </div>

    );
  }

}

export default App;
