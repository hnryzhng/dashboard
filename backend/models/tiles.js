const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const tileSchema = new Schema(
	{	// current array of tiles in user dashboard
		tile_id: {
			type: String,	// Task: maybe change to schema type mongoose.ObjectId and create new instance with mongoose.Types.ObjectId()
			required: true
		},
		tile_index: {	// display order in dashboard
			type: Number,	
			required: true
		},
		tile_type: {
			type: String,	// example: bar, chart, count
			required: true
		},
		dataSource_id: {
			type: String,
			required: true
		},
		generated_dataset: {
			type: Array,	// processed dataset of particular tile
			required: true
		}
	}
);

module.exports = mongoose.model("Tiles", tileSchema, "tiles");