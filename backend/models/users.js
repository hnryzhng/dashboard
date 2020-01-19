const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true
		},
		password {
			type: String,
			required: true
		},
		tiles_list: {
			type: Array,	// array of tile IDs, order determined by tile index
			required: true
		},
		dataSources_list: {
			type: Array,	// array of dataSource IDs
			required: true
		},
		transactions: [{
			type: String,	// type: tile, dataSource
			id: String,	// id of either tile or dataSource
			action: String,	// actions: ADD_TILE, REMOVE_TILE, ADD_DATASOURCE, REMOVE_DATASOURCE
			timestamp: {
				type: Date,
				default: Date.now
			}
		}]
	}
);

module.exports = mongoose.model("Users", userSchema, "users");