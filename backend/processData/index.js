// processData/index.js

const path = require('path');

var read2json = require('./read2json.js');
var convertData = require('./convertData.js');
var storeData = require('./storeData.js');

// PROCESS DATA FOR CHARTS
// read2json: read data from source into JSON given path and type of data
// convertData: convert JSON into data format for db storage in dataSource collection given path and data type
// storeData: store converted data object in dataSource collection

var processData = function(dataPath) {
	
	const fullPath = path.join(__dirname, dataPath);
	// console.log('processData fullPath:', fullPath);

	read2json(fullPath);

	

};

module.exports = processData;




