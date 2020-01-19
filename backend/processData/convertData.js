// convertData.js

// convert JSON into data format for db storage in dataSource collection given path and data type

const path = require('path');

var storeData = path.join(__dirname, 'storeData.js');

// TASK BOOKMARK
// front-end: users selects data columns and chart type? 
// front-end OR backend: then validate if columns of data can be rendered from selected chart type?
// back end: if can be rendered, then send req with body params of which columns and chart type, then create appropriate dataset and send in response?  
// back end: add chart type and correspondingly processed dataset to generatedDatasets of the dataSource record


checkTileTypes() {
	// example output: ["chart", "bar", "count"]

	// return tileTypesArray

}


var convertData = function(jsonLinearArray) {

	const record = {
		// id
		// timestamp
		title: "",
		description: "",
		data: jsonLinearArray,
		generatedDatasets: []	// [{ tileType STR, dataset OBJ }, ...]	
		// TASK: limit number of datasets depending on permissions
	}

	// storeData(record);

};

convertData.lineChart = (jsonObj) => {
}

module.exports = convertData;