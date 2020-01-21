// processData/index.js

const path = require('path');

var read2json = require('./read2json.js');
// var convertData = require('./convertData.js');
// var storeData = require('./storeData.js');
var generateDatasets = require('./generateDatasets.js');

// PROCESS DATA FOR CHARTS
// read2json: read data from source into JSON given path and type of data
// convertData: convert JSON into data format for db storage in dataSource collection given path and data type
// storeData: store converted data object in dataSource collection

var processData = function(requestBody) {
	
	// get variables from body of POST request from processData route
	const { dataPath, selectedTileType, objectsArray, columnsArray, dataID, dataName, dataDescription } = requestBody;

	// MAYBE TASK BOOKMARK
	// if there is an objectsArray because user uploaded local csv file, then should send straight to generateDatasets => storeData
	
	// if given API url to extract and process data, then go to processData(dataPath), read2json, convertData, storeData
	// console.log('processData fullPath:', fullPath);
	// read2json(fullPath);

	console.log('datapath:', dataPath);
	console.log('selectedTileType:', selectedTileType);
	console.log('objectsArray:', objectsArray);

	generateDatasets(objectsArray, columnsArray);	// return generated dataset? if async, then nest subsequent modules in generateDatasets module file
	// convertData()
	// storeData()


};

module.exports = processData;




