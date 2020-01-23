// storeData.js
// store in processed data object in dataSource collection

var path = require('path');

// import mongoose models
var Tiles = require(path.join(__dirname, '/../', 'models', 'tiles.js'));
var DataSources = require(path.join(__dirname, '/../', 'models', 'dataSources.js'));

// TASK: refer to upload file route in mini-fridge 
// TASK: add to users collection
var storeData = function(dataSourceRecord, tileRecord) {

	// create model instances
	const tileRec = new Tiles(tileRecord);  
	const dataSourceRec = new DataSources(dataSourceRecord);
	
	tileRec.save()
			.then(tileDoc => console.log("tile doc saved in db:", tileDoc))
			.catch(err => console.log("error saving tile doc to db:", err));

	dataSourceRec.save()
			.then(dataSourceDoc => console.log("dataSource doc saved in db:", dataSourceDoc))
			.catch(err=> console.log("error saving dataSource doc to db:", err));









};

module.exports = storeData;

