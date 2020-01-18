// processData/index.js

const fs = require('fs');

var read2json = require('./read2json.js');
var convertData = require('./convertData.js');
var storeData = require('./storeData.js');

// PROCESS DATA FOR CHARTS
// read2json: read data from source into JSON given path and type of data
// convertData: convert JSON into data format for db storage in dataSource collection given path and data type
// storeData: store converted data object in dataSource collection

var processData = function(dataPath) {
	console.log('processData dataPath:', dataPath);
};

module.exports = processData;




