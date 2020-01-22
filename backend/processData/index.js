// processData/index.js

const path = require('path');

var read2json = require('./read2json.js');
var convertData = require('./convertData.js');
// var storeData = require('./storeData.js');
var generateDatasets = require('./generateDatasets.js');

// PROCESS DATA FOR CHARTS
// read2json: read data from source into JSON given path and type of data
// convertData: convert JSON into data format for db storage in dataSource collection given path and data type
// storeData: store converted data object in dataSource collection

var processData = function(requestBody) {
	
	// get variables from body of POST request from processData route
	const { selectedTileType, objectsArray, selectedColumnsArray, dataPath, dataID, dataName, dataDescription } = requestBody;

	// MAYBE TASK BOOKMARK
	// if there is an objectsArray because user uploaded local csv file, then should send straight to generateDatasets => storeData
	
	// if given API url to extract and process data, then go to processData(dataPath), read2json, convertData, storeData
	// console.log('processData fullPath:', fullPath);
	// read2json(fullPath);

	console.log('datapath:', dataPath);
	console.log('selectedTileType:', selectedTileType);
	console.log('selectedColumnsArray:', selectedColumnsArray);
	console.log('objectsArray:', objectsArray);

	// TASK: have generate datasets do CLEAN DATA? 
	var generatedDataArray = generateDatasets(objectsArray, selectedColumnsArray);	// return generated dataset? if async, then nest subsequent modules in generateDatasets module file
	var { dataSourceRecord, tileRecord } = convertData(objectsArray, generatedDataArray, selectedTileType, {dataID, dataName, dataDescription, dataPath})	// BOOKMARK
	// storeData()

	console.log("objectsArray of original dataset:", objectsArray);
	console.log("processData module generatedDataArray:", generatedDataArray);
	console.log("processData dataSourceRecord:", dataSourceRecord);
	console.log("processData tileRecord:", tileRecord);
};

module.exports = processData;




