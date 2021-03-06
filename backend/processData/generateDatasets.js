
// TASK BOOKMARK: have generate datasets do CLEAN DATA?

var generateDatasets = function(objectsArray, selectedColumnsArray) {

	// create new dataset from objectsArray with only selected columns from selectedColumnsArray
	
	var generatedDataArray = [];

	for (var i=0; i<objectsArray.length; i++) {
		var object = objectsArray[i];
		var objectKeys = Object.keys(object);
		var selectedColumns = Object.values(selectedColumnsArray);
		var newObject = {};

		// console.log("objects array i:", i);
		// console.log("object:", object);
		// console.log("object keys:", objectKeys);
		// console.log("selectedColumnsArray:", selectedColumnsArray);

		
		// for each key in object, if key is also in selectedColumnsArray, then grab key-value pair
		for (var j=0; j< objectKeys.length; j++) {
			var key = objectKeys[j];

			// console.log("object keys j:", j)
			// console.log("object key:", key);

			if (selectedColumns.indexOf(key) !== -1) {
				// if key is present in columns array
				console.log("true");
				newObject[key] = object[key];	// put object's key-value pair in new object
			}
			
			// console.log("new object:", newObject);
			// console.log("------------")
			
		}
		
		generatedDataArray.push(newObject);	// add new object with user selected columns (keys) to new objects array


	}

	console.log("generatedDataArray:", generatedDataArray);

	var generatedDataArray = generatedDataArray;

	return generatedDataArray;
}


module.exports = generateDatasets;