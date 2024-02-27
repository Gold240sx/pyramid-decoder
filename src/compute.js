// Issue 1. Get the file content from the txt file
const encodedMessage = [3, 6, 2, 4, 1, 5, 47, 29, 73, 49]

// 1.1 - read the file contents
const data = async () => {
	const d = await fetch("./coding_qual_input.txt").then((response) => {
		const formattedData = []
		//1.2 - parse the file contents based on the line break (async then promise))
		response.text().then((text) => {
			text.split("\r\n").map((s) => {
				// 1.3 - split the file contents based on the space
				const segment = s
				const [key, value] = segment.split(" ")
				const numericVal = parseInt(key)
				// 1.4 - push the formatted data to the global variable
				formattedData.push({ numericVal, value })
			})
		})
		return formattedData
	})
	return d
}

//1.5 - call the function to ensure data is returned from the async promise
const outputData = async () => {
	return await data()
}

/* 2nd issue: 
	1. We need to sort the numbers from least to greatest, 
	2. place them in lines(lineArray[])  (pyramid)
*/
//2.1
const makePyramid = (numArr) => {
	var arrLength = numArr.length
	let sortedArr = numArr.sort((a, b) => a - b)
	let pyramid = []
	let i = 1
	// the line length should first be set by the i
	// then we push the value of the number to the line up to the length of the line
	// then we set the newSortedArr === the sortedArr - the values we just used
	// then we add 1 to i so long as i is less than the length of the sortedArr
	while (arrLength) {
		// with each new array, we push the values of the sorted array into the pyramid array
		pyramid.push(sortedArr.splice(0, i))
		arrLength = sortedArr.length // removes the used values so that the array length matches the desired pyramid length
		i++
	}
	// check if the pyramid is valid
	if (pyramid.length === pyramid[pyramid.length - 1].length) {
		console.log(pyramid.length, pyramid[pyramid.length - 1].length)
		return pyramid
	} else {
		console.log(pyramid.length, pyramid[pyramid.length - 1].length)
		return "Invalid pyramid"
	}
}

// 3rd issue, we need to pop off the ends of each line and create a new array from it:
//3.1
const endOfPyr = (pyr) => {
	let endArr = []

	pyr.map((arr) => {
		let end = arr.pop()
		endArr.push(end)
	})
	return endArr
}
//3.2 -  saving this as a variable to make this easier to read
const endArr = endOfPyr(makePyramid(encodedMessage))

//4th issue, we need to convert the numbers to the corresponding string from the data
//4.1
async function decodeDataToText(list, dataSource) {
	// 4.2 - get the file content from the txt file
	var message = await outputData().then((data) => {
		// for each number in the endArr ...
		const d = list.map((num) => {
			// 4.3 - find the value that matches the number
			try {
				const value = dataSource.find((d) => d.numericVal == num).value
				return value
			} catch (e) {
				return "invalid number in sequence"
			}
		})
		// add a space to the end of each word to form the sentence, and return the sentence
		return d.join(" ")
	})

	return message
}

//Solution:
console.log(decodeDataToText(endArr, data)) // Saved as a promise - easier to access in a project, and not just a vanilla JS file.
