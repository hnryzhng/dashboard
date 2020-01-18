
// read2json.js

// produce JSON object given data

function findDataType(path) {
	// type of data: CSV, JSON (from API endpoint) 
	// given path, determine if what type of data it is (
	// example: csv by looking at extension, json given url and a successful response from API endpoint)


	// return dataType
}


var read2json = function(path) {
	// const path = ""	// path or url to read in data

	const dataType = findDataType(path);	// csv, API (json)

	// If CSV
	// path: path of csv file
	// type: csv

	// If API endpoint and JSON object
	// send request to API endpoint to get data from 
	// path: url of API endpoint
	// type: json

	// return jsonObject;
};

module.exports = read2json;