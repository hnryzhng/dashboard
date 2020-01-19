const mongoose = require('mongoose');

// TASK: impose size limit for dataset?

const Schema = mongoose.Schema;
const dataSourceSchema = new Schema(
	{
		dataSource_id: {	// content hash? 
			type: String,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		data: {
			type: Array,	// array of objects?	
			required: true
		}

	}
)

module.exports = mongoose.model("DataSource", dataSourceSchema, "dataSource");