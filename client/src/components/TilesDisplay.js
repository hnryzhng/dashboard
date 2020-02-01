import React, { Component } from 'react';


// import styles
import '../styles.css'

// import components
import Tile from './Tile.js';

class TilesDisplay extends Component {

	state = {
		tilesPerRow: 2,
		tilesRowsList: [],
		currentRowIndex: 0
	}

	componentDidMount() {
		
		console.log("tiles container component did mount");

		this.createTilesRows();

	}

	componentDidUpdate(prevProps, prevState) {
		console.log("tiles container component did update");
		
		if (prevProps.tilesList !== this.props.tilesList) {
			console.log("prev props tiles list:", prevProps.tilesList);
			console.log("this props tiles list:", this.props.tilesList);
			this.createTilesRows();
		}
	}

	createTilesRows = () => {
		// generate array of rows containing appropriate num of tile objects specified by tilesPerRow

		var tilesList = this.props.tilesList;
		console.log("TilesDisplay tilesList:", tilesList);
		
		var tilesRowsList = [];
		var tilesPerRow = this.state.tilesPerRow;
		if (tilesList.length > 0) {
			for (var i=0; i<tilesList.length; i++) {
				if (i % tilesPerRow === 0) {
					// console.log("rowArray i:", i);
					var rowArray = [];
					var tileObj = tilesList[i];
					// console.log("tileObj:", tileObj);
					rowArray.push(tileObj);
					// console.log("rowArray:", rowArray);
					tilesRowsList.push(rowArray);
				} else {
					// console.log("rowArray i:", i);
					var lastRowArray = tilesRowsList.pop();
					// console.log("lastRowArray:", lastRowArray);
					var tileObj = tilesList[i];
					lastRowArray.push(tileObj);
					tilesRowsList.push(lastRowArray);
				}

			}

			console.log("tilesRowsList:", tilesRowsList);
			this.setState({ tilesRowsList: tilesRowsList });

		}

	}


	render() {
		let tilesDisplay;
		var tilesRowsList = this.state.tilesRowsList;	// load list of row arrays containing tile objects
		tilesDisplay = tilesRowsList.map((rowArray, index) => {
			// render each row
			return(
				<div className="row">
				
					{
						rowArray.map((tileObj, j) => {
							// render tile given tileObj in rowArray
							return(<Tile key={ tileObj.tileID } tileType={ tileObj.tileType } dataSource={ tileObj.dataSourceID } />)
						})
					}

				</div>)

		})
		
		return(
				
			<div className="container-fluid">
				{ tilesDisplay }
			</div>


		)
	}


}

export default TilesDisplay;