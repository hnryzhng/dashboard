const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");

require('dotenv').config()	// load env vars

// IMPORT MY EXTERNAL MODULES
// const moduleA = require(path.join(__dirname, "/moduleA.js"));
// const pingHeroku = require(path.join(__dirname, '/ping-heroku.js'));
// pingHeroku("https://<myherokuname>.herokuapp.com", millisecondsDelay);

// INSTANTIATE APP 
const app = express();
const api_port = process.env.PORT || 3001;

// DATABASE
const dbRoute = process.env.MONGOLAB_URI;

mongoose
	.connect(
		dbRoute,
		{ 
			useNewUrlParser: true,
			useUnifiedTopology: true
		}
	)
	.then(() => console.log("connected to MongoDB database"))
	.catch((err) => console.log("error connecting to MongoDB:", err));


// LOAD MIDDLEWARE
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(cors());

// SERVE REACT SCRIPTS

// app.use(express.static(path.join(__dirname, '/../', 'client', 'build')));	// Adds the react production build to serve react requests

// app.get('*', (req, res) => {
	// serve react front-end for all non-specified routes
	// res.sendFile(path.join(__dirname, '/../', 'client', 'build', 'index.html'));
// });


// ROUTES
app.use("/api", require('./routes'));	// routes for api requests: root/api/<specific_route>

module.exports = app.listen(api_port, () => console.log(`Listening to ${api_port}`) );