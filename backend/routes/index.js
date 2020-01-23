// routes/index.js

var router = require('express').Router();
var path = require('path');

var processData = require(path.join(__dirname, "/../", "processData", "index.js"));

// ROUTES
router.post('/processData', (req, res) => {

	// TASK: validation - check to see if dataSource_id exists with data's content hash/checksum
	// if not, then store in db

	processData(req.body);
	

});



module.exports = router;