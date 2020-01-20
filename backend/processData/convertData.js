// convertData.js

// convert JSON into data format for db storage in dataSource collection given path and data type

const path = require('path');

var storeData = path.join(__dirname, 'storeData.js');

// TASK BOOKMARK
// front-end: users selects data columns and chart type? 
// front-end OR backend: then validate if columns of data can be rendered from selected chart type?
// back end: if can be rendered, then send req with body params of which columns and chart type, then create appropriate dataset and send in response?  
// back end: add chart type and correspondingly processed dataset to generatedDatasets of the dataSource record


function checkTileTypes() {
	// example output: ["chart", "bar", "count"]

	// return tileTypesArray

}


var convertData = function(objectsArray) {
	// TASK: limit number of datasets depending on user permissions

	// TASK BOOKMARK
	// generate datasets based on user selection of tile type and its columns or other features

	const record = {
		dataSource_id: "",	// TASK: UUID or content hash?
		name: "",
		description: "",	// twitter, table, etc.
		data: objectsArray
		// generated_datasets: []	// should be reserved for processing tile data: [{ tile_type STR, dataset ARRAY of objects }, ...]	
	}

	// storeData(record);

};

convertData.lineChart = (jsonObj) => {
}

module.exports = convertData;