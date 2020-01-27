
function wrangle(selectedColumnsObj, dataArray) {

	// BACKEND?

	// trim leading/trailing whitespaces
	// remove or impute empty cell values

	// selectedColumnsObj = [colA, colB, ...] 
	/// dataArray = [{ colA, colB, ...}, ...]

	// only clean values of columns that were selected?




	// return cleaned dataset
}

function variableType(variable) {

	// TASK BOOKMARK

	// if a number, regardless of type, return output "number"
	// Task: Datetime and days such as "Mon" would also return "number"  
	if (Number(variable) !== NaN) {
		return "number";
	} 

	if (typeof variable === "string" && Number(variable) === NaN) {
		// if a string that is not a number, return "string"
		return "string";
	}
}

function validateAxisType(selectedTileType, selectedColumnsObj, sampleArray) {

		/**
			pseudo-code for a line chart example
			
			selectedTileType = "line"
			
			sampleArray = [{ linex: valA, liney: valB, ... }, ...]
			OR [{ colA: valA, colB: valB, ... }, ...];

			sampleArray's rowObj = { linex: valA, liney: valB }
			OR { colA: valA, colB: valB }

			selectedColumnsObj = {
				x: linex,
				y: liney
			}
			OR 
			{
				x: colA
				y: colB
			}

			// validation comparison
			axisType[selectedTileType].x === typeof valA (from rowObj[selectedColumnsObj.x])
			axisType[selectedTileType].y === typeof valB (from rowObj[selectedColumnsObj.y])

		**/


	// TASK: maybe have multiple types for one axis
	// TASK: for datetime obj and days such as "Mon", should return both instead of just number, or its own type
	// TASK: validate for line's date object in the future using Number(Date(dateObj))?
	// refer to variableType function
	const axisTypes = {
		"line": {
			"x": "number",	// return true for particular value if numeric string or integer
			"y": "number"	
		},
		"bar": {
			"x": "string",	// return true if simply a non-empty string, if empty, simply remove column or imputation
			"y": "number"
		}
	}

	// console.log("Number(int) type:", typeof Number(123));
	// console.log("Number(numericString) type:", typeof Number('123'));

	var isValid = true;
	for (var i=0; i<sampleArray.length; i++) {
		var rowObj = sampleArray[i];

		// check if a selected column exists in row obj

		// axisType[selectedTileType].x === typeof valA (from rowObj[selectedColumnsObj.x])
		// axisType[selectedTileType].y === typeof valB (from rowObj[selectedColumnsObj.y])

		// if row exists
		if (rowObj) {
			// const valA = rowObj[selectedColumnsObj.x];
			// console.log("row obj:", rowObj);
			// console.log("selectedColumnsObj:", selectedColumnsObj)
			// console.log("selectedColumnsObj x value:", selectedColumnsObj.x)
			// console.log("valA:", valA);

			// for every axis
			var columnsAxes = Object.keys(selectedColumnsObj);	// e.g., x, y
			
			for (var j=0; j < columnsAxes.length; j++) {
				var axis = columnsAxes[j];
				var col = selectedColumnsObj[axis];
				const rowColumnVal = rowObj[col];

				// console.log('-----');
				// console.log("row obj:", rowObj);
				// console.log("selectedColumnsObj:", selectedColumnsObj);
				// console.log("selectedColumnsObj axis:", axis);
				// console.log("selectedColumnsObj axis column:", selectedColumnsObj[axis]);
				// console.log("row column value:", rowColumnVal);

				// console.log("axis selected tile type axis type:", axisTypes[selectedTileType][axis])
				// console.log("axis column value type:", variableType(rowColumnVal));

				// TASK BOOKMARK: good way of determining if variable is a number, regardless of type (string or integer or float)
				// variableType function
				if (axisTypes[selectedTileType][axis] !== variableType(rowColumnVal)) {
					isValid = false;
					console.log("following row has invalid axis type for selected column:")
					console.log("row:", rowObj)
					console.log("column:", col)
					console.log("axis:", axis)
					console.log("row column axis type:", variableType(rowColumnVal))
					console.log("should be axis type:", axisTypes[selectedTileType][axis])
				}
			}

		}		

	return isValid;
	}
}

function convertColumnTypes() {

	// converts selected columns to appropriate types to produce final dataset 
}


function randomNum(maxNum) {
	var num = (Math.random() * maxNum);
	var randomInteger = Math.floor(num);

	return randomInteger;
}

function generateSampleArray(dataset, rowNum) {
	// dataset = [{ colA, colB, ... }, ...]

	var sampleArray = [];
	// let randomNumSet = new Set();

	for (var i=0; i<rowNum; i++) {
		const randomIndex = randomNum(dataset.length);
		console.log("generateSampleArray randomIndex:", randomIndex);

		var rowObj = dataset[randomIndex];
		console.log("generateSampleArray rowObj:", rowObj);

		sampleArray.push(rowObj);
	}

	return sampleArray;
}


function validateSelections(selectedTileType, selectedColumnsObj, dataset) {
	// TASK: needs more appropriate function name

	console.log("hello validate selections!");


	// produce 5 rows from dataset array choose based on indices determined by (pseudo)random values
	// for selected columns in the row:
	// clean trim leading and trailing whitespaces
	// determine if the column's value is appropriate for the selected chart/tile type
	// if invalid, return null
	// if valid:
	// convert value if axis supposed to be a number, convert numeric string (not NaN) or integer to integer 
	// return new data array with converted numerical values


	// console.log("validate selections selectedTileType:", selectedTileType);
	// console.log("validate selections selectedColumnsObj:", selectedColumnsObj);
	// console.log("validate selections dataset:", dataset);


	var sampleArray = generateSampleArray(dataset, 3);
	console.log("sampleArray:", sampleArray);

	var isValid = validateAxisType(selectedTileType, selectedColumnsObj, sampleArray);
	console.log("is valid type:", isValid);







	// 1. wrangle dataset - trim leading/trailing whitespaces, remove or impute empty cell values
	// 2. validate that the type of value in particular column is appropriate given the chart or tile type
	// 3. convert and process dataset into correct value types (e.g., num string/number -> int) for sending to backend processing and storage in db

	// var wrangledDataset = wrangle(selectedColumnsObj, dataSourceData);
	// var isValid = validateAxisType(selectedTileType, selectedColumnsObj, wrangledDataset)
	// if (isValid) {
		// return convertColumnTypes(wrangledDataset);
	// } else {
		// return null;
	// }

};

module.exports = validateSelections;