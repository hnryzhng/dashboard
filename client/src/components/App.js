
import React, { Component } from 'react';

// import dependencies
import axios from 'axios';
import Papa from 'papaparse';
import validateSelections from '../validateSelections.js';

// import styles
import '../styles.css'

// import components
import Navbar from './Navbar.js';
// import TileControl from './TileControl.js';
import TilesDisplay from './TilesDisplay.js';

// import demo components
import TileControlDemo from './demo/TileControlDemo.js';

// import data
// import { linedata, bardata } from "./mockdata.js";


class App extends Component {

  // top-level configurations: tile layout/arrangement

  state = {
  	user: null,
  	loggedIn: null,
    tilesList: [],  // [{ str tile_id, num tile_index, str tile_type, str dataSource_id, array generated_dataset, (obj tileElement) }]
    dataSourcesList: [] // [{ str dataSource_id, str name }]
  }

  componentDidMount() {

    // if logged in
    // fetch user tiles list and data sources list from user db


    // DEMO: load demo tiles
    var demoTilesList = [
      { 
        tileID: "demo-pie", 
        tileIndex: 0,
        tileType: "pie",
        dataSourceID: null
      },
      {
        tileID: "demo-line",
        tileIndex: 1,
        tileType: "line",
        dataSourceID: null
      }
    ]

    this.setState({ tilesList: demoTilesList })

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

    return (


      <div>

      	<Navbar />

      	<TileControlDemo { ...this.state } handleListsUpdates={ this.handleListsUpdates }/>

        <TilesDisplay tilesList={ this.state.tilesList } />

      </div>

    );
  }

}


export default App;
