// routes/index.js

var router = require('express').Router();
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

router.get('/processData', (req, res) => {

	// processData(path);

});



module.exports = router;