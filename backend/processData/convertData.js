// convertData.js

// convert data into JSON objects for storage in tile and dataSource collections

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


var convertData = function(objectsArray, generatedDataArray, selectedTileType, metadataRecord) {
	// TASK: limit number of datasets depending on user permissions

	// TASK BOOKMARK
	// generate datasets based on user selection of tile type and its columns or other features
	// generateDatasets module?

	var { dataID, dataName, dataDescription, dataPath } = metadataRecord;
	console.log("convertData metadataRecord:", metadataRecord);

	// TASK: see if record already exists; if it does, then 

	const dataSourceRecord = {
		dataSource_id: dataID,	// TASK: UUID or content hash?
		name: dataName,
		description: dataDescription,	// twitter, table, etc.
		path: dataPath,
		data: objectsArray
	}

	const tileRecord = {
		tile_id: "",
		tile_index: "",
		tile_type: selectedTileType,
		dataSource_id: dataID,
		generated_dataset: generatedDataArray
	}

	// storeData(record);
	return { dataSourceRecord, tileRecord };

};

convertData.lineChart = (jsonObj) => {
}

module.exports = convertData;