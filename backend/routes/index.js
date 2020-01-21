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

	processData(req.body);
	

});



module.exports = router;