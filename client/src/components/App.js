import React, { Component } from 'react';

// import dependencies
import axios from 'axios';

// import styles
import '../styles.css'

// import components
import Tile from './Tile.js';
import LineChartContainer from './LineChartContainer.js';
import { linedata, bardata } from "./mockdata.js";

class App extends Component {

  // top-level configurations: tile layout/arrangement

  state = {
    tilesList: [],  // [{ str tile_id, num tile_index, str tile_type, str dataSource_id, array generated_dataset, (obj tileElement) }]
    dataSourcesList: [], // [{ str dataSource_id, str name }]
    selectedTileType: "",
    selectedDataSourceID: ""
  }

  componentDidMount() {

    // if logged in
    // fetch user tiles list and data sources list from user db

  }

  addTile = () => {
    // add tile to tilesList

    var tilesList = this.state.tilesList;
    var tType = this.state.selectedTileType;
    var dID = this.state.selectedDataSourceID;

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
        tileType: tType,
        dataSourceID: dID
      }

      console.log("tile object:", tileObject);

      // TASK BOOKMARK
      // send POST request to appropriate route
      // generate dataset in backend for particular tile based on user selection of columns or other feature 
      // create processTileData folder?


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

  addDataSource = () => {
    // add data source object upon user select

    // TASK: check if data source name for particular user already exists
    // TASK: limits per user?

    const baseUrl = 'http://localhost:3001';
    const dPath = 'testdata.csv';

    axios.post(`${baseUrl}/api/processData`, {
      dataPath: dPath
    })
    .then(response => response.data)
    .then(data => data)
    .catch( err => console.log('error:', err));
  }

  render() {

    console.log("selected tile type:", this.state.selectedTileType);

    console.log("selected data source:", this.state.selectedDataSourceID);
    
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

          <select id="data-source" value={ this.state.selectedDataSourceID } onChange={ (event)=>{ this.setState({ selectedDataSourceID: event.target.value }) } }>
            <option defaultValue="choose data source">generate list of dropdown based on tile type?</option>            
            <option value="mock-bar-data">Bar data</option>
            <option value="mock-line-data">Line data</option>
            <option value="dataSource.id" disabled> "dataSource.title" </option>
          </select>

          <button type="button" onClick={ () => { this.addTile() } }>Add Tile</button>

          <button type="button" onClick={ () => { this.addDataSource() } }>ADD DATA</button>

        </div>


      </div>

    );
  }

}

export default App;
