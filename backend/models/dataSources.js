const mongoose = require('mongoose');

// TASK: impose size limit for dataset?

const Schema = mongoose.Schema;
const dataSourceSchema = new Schema(
	{
		dataSource_id: {
			type: String,
			required: true
		},
		dataSource_name: {
			type: String,
			required: true
		}
		dataset: {
			type: Array,	// array of objects?	
			required: true
		}

	}
)

module.exports = mongoose.model("DataSource", dataSourceSchema, "dataSource");