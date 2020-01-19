// read2json.js

// produce JSON object given data

const fs = require('fs');
const csvjson = require('csvjson');
const path = require('path');

var convertData = require(path.join(__dirname, 'convertData.js'));


function findDataType(path) {
	// type of data: CSV, JSON (from API endpoint) 
	// given path, determine if what type of data it is (
	// example: csv by looking at extension, json given url and a successful response from API endpoint)

	// return dataType
	return 'csv';
}

var csv2json = async function(dataPath) {


		fs.readFile(dataPath, 'utf-8', (err, csvContent) => {
			if (err) {
				console.log('error converting csv to JSON:', err);
			}

			console.log('csvContent:', csvContent);

			const jsonLinearArray = csvjson.toObject(csvContent);	// returns array of JSON objects for rows in csv
			// console.log('JSON object from processData csv:', JSON.stringify(jsonLinearArray));
			// console.log('type of JSON object:', typeof jsonLinearArray);

			// pass array to convert data for storage in db
			convertData(jsonLinearArray);

		});

		// readFileSync for returning it without callbacks
		// var stringObj = fs.readFileSync(dataPath, 'utf-8');;	// TASK: if too large a file, timeout after n seconds?
		// console.log('stringObj object type:', typeof stringObj);
		// var jsonObj = csvjson.toObject(stringObj);
		// console.log('json readfilesync:', jsonObj);
		// console.log('type of json readfilesync:', typeof jsonObj);


};

var read2json = function(dataPath) {

	// const dataType = findDataType(dataPath);	// csv, API (return json as is? type json?)

	// TASK: when reading in csv or other external data, check for malicious scripts in cells

	let jsonLinearArray;

	switch(findDataType(dataPath)) {
		case 'csv':
			csv2json(dataPath);
			// console.log('read2json jsonLinearArray first line:', jsonLinearArray);
		case 'api':
			break
	}


};


module.exports = read2json;