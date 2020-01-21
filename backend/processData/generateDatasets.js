
var generateDatasets = function(objectsArray, columnsArray) {

	// create new dataset from objectsArray with only selected columns from columnsArray
	
	var newObjectsArray = [];

	for (var i=0; i<objectsArray.length; i++) {
		var object = objectsArray[i];
		var objectKeys = Object.keys(object);
		var newObject = {};

		// console.log("objects array i:", i);
		// console.log("object:", object);
		// console.log("object keys:", objectKeys);
		// console.log("columnsArray:", columnsArray);

		
		// for each key in object, if key is also in columnsArray, then grab key-value pair
		for (var j=0; j< objectKeys.length; j++) {
			var key = objectKeys[j];

			// console.log("object keys j:", j)
			// console.log("object key:", key);

			if (columnsArray.indexOf(key) !== -1) {
				// if key is present in columns array
				console.log("true");
				newObject[key] = object[key];	// put object's key-value pair in new object
			}
			
			// console.log("new object:", newObject);
			// console.log("------------")
			
		}
		
		newObjectsArray.push(newObject);	// add new object with user selected columns (keys) to new objects array


	}

	console.log("newObjectsArray:", newObjectsArray);
}


module.exports = generateDatasets;