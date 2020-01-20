// routes/index.js

var router = require('express').Router();
var path = require('path');

var processData = require(path.join(__dirname, "/../", "processData", "index.js"));

// ROUTES
/**

// @route GET api/routeA
// @desc Does this
// @access Public

router.post('/routeB', (req, res) => {
	
	const something = req.body.sName;

});

**/

router.post('/processData', (req, res) => {
	// get variables from body of POST request
	const { dataPath, selectedTileType, objectsArray, columnsArray, dataID, dataName, dataDescription } = req.body;

	console.log('datapath:', dataPath);
	console.log('selectedTileType:', selectedTileType);
	console.log('objectsArray:', objectsArray);
	// TASK BOOKMARK generateDatasets file?

	// MAYBE
	// if there is an objectsArray because user uploaded local csv file, then should send straight to generateDatasets => storeData
	
	// if given API url to extract and process data, then go to processData(dataPath), read2json, convertData, storeData


});



module.exports = router;