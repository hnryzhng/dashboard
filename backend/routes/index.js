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

	const dataPath = req.body.dataPath;

	// const dataPath = 'testdata.csv';

	processData(dataPath);

});



module.exports = router;