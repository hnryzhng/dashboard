// read2json.js

// produce JSON object given data

const fs = require('fs');
const csvjson = require('csvjson');
const path = require('path');


function findDataType(path) {
	// type of data: CSV, JSON (from API endpoint) 
	// given path, determine if what type of data it is (
	// example: csv by looking at extension, json given url and a successful response from API endpoint)

	// return dataType
	return 'csv';
}

var csv2json = function(dataPath) {

	// CSV

	fs.readFile(dataPath, 'utf-8', (err, csvContent) => {
		if (err) {
			console.log('error converting csv to JSON:', err);
		}

		console.log('csvContent:', csvContent);

		const jsonLinearArray = csvjson.toObject(csvContent);	// returns array of JSON objects for rows in csv
		// console.log('JSON object from processData csv:', JSON.stringify(jsonLinearArray));
		// console.log('type of JSON object:', typeof jsonLinearArray);

		return jsonLinearArray;

	});

};

var read2json = function(dataPath) {

	// const dataType = findDataType(dataPath);	// csv, API (return json as is? type json?)

	// TASK: when reading in csv or other external data, check for malicious scripts in cells

	switch(findDataType(dataPath)) {
		case 'csv':
			csv2json(dataPath);
			break
		case 'api':
			break
	}

};


module.exports = read2json;