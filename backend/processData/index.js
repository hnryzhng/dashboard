// processData/index.js

const fs = require('fs');
const csvjson = require('csvjson');
const path = require('path');

var read2json = require('./read2json.js');
var convertData = require('./convertData.js');
var storeData = require('./storeData.js');

// PROCESS DATA FOR CHARTS
// read2json: read data from source into JSON given path and type of data
// convertData: convert JSON into data format for db storage in dataSource collection given path and data type
// storeData: store converted data object in dataSource collection

var processData = function(dataPath) {
	console.log('processData dataPath:', dataPath);

	const csvPath = path.join(__dirname, dataPath);
	console.log('csvPath:', csvPath);

	// TASK: when reading in csv or other external data, check for malicious scripts in cells

	fs.readFile('./testdata.csv', 'utf-8', (err, csvContent) => {
		if (err) {
			console.log('error converting csv to JSON:', err);
		}

		console.log('csvContent:', csvContent);

		//const jsonObj = csvjson.toObject(csvContent);
		//console.log('JSON object from processData csv:', JSON.stringify(jsonObj));
		//console.log('type of JSON object:', jsonObj);


	});

};

module.exports = processData;




