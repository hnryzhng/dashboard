import React, { Component } from 'react';

// import styles
import '../styles.css'

// import components
import Tile from './Tile.js';
import LineChartContainer from './LineChartContainer.js';
import { linedata, bardata } from "./mockdata.js";

class App extends Component {

  // top-level configurations: tile layout/arrangement

  state = {
    tilesList: [],  // [{ str fileID, int tileIndex, str tileType, str dataSourceID, (obj tileElement) }]
    dataSources: {}, // { str dataSourceID: obj dataSourceObj } OR just pass dataSourceID down to tile chart container, and have it fetch data based on tile id, but this second way would mean that multiple tiles using same data source will load redundant data 
    selectedTileType: "",
    selectedDataSourceID: ""
  }

  componentDidMount() {

    // if logged in
    // fetch user tiles list data
    // load all data into this.state.dataSources based on tiles data source id

  }

  addTile = () => {
    // add tile to tilesList

    var tilesList = this.state.tilesList;
    var tType = this.state.selectedTileType;
    var dID = this.state.selectedDataSourceID;

    // TASK: BOOKMARK
    // check to see if selected tile type can be paired with selected data source
    // if tile type in dataSource db record object's forTileTypes array

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
      // TASK temporary: create UUID for particular user? for now, increment based on preceding tile id in tilesList
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

        </div>


      </div>

    );
  }

}

export default App;
