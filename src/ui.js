const input = document.getElementById("current-number")
const numPadContainer = document.getElementById("num-pad")
const currentNumber = document.getElementById("current-number")
const resetButton = document.getElementById("reset-btn")
const endStringP = document.querySelector("#decoded-pop-up p")
const nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ",", "<"]
const numBtns = document.querySelectorAll(".numbtn")
var currentNum = ""
let currentNumArr = []
var decodedMessage = ""

for (let i = 0; i < nums.length; i++) {
	let button = document.createElement("button")
	button.classList = "numbtn"
	button.type = "button"
	button.onclick = () => numChange(nums[i])
	if (i === 10) {
		// adjust the position of the comma text
		button.innerText = ","
		button.style.paddingBottom = "10px"
	} else {
		button.innerText = nums[i]
	}
	numPadContainer.append(button)
}
let convertButton = document.createElement("button")
convertButton.classList = "convertbtn"
convertButton.type = "submit"
convertButton.onclick = () => convertCode()
convertButton.innerText = "Convert"
numPadContainer.parentElement.append(convertButton)

const numChange = (num) => {
	if (num === "<") {
		if (currentNum.slice(-2) == ", ") {
			// if the last button pressed was a ", ", then remove both the comma and the space
			currentNum = currentNum.slice(0, -2)
		} else {
			currentNum = currentNum.slice(0, -1)
		}
	} else if (num === ",") {
		if (currentNum.slice(-2) == ", ") {
			// dont add the comma if the last thing entered was a comma
		} else {
			currentNum = currentNum + ", "
		}
	} else {
		currentNum += num
	}
	// if the number does not equal "" then show the reset button.
	if (currentNum.trim() !== "") {
		resetButton.style.opacity = "1"
		resetButton.style.pointerEvents = "auto"
	}

	input.value = currentNum.toString()
}

const resetCurrentNum = () => {
	currentNum = ""
	input.value = ""
	resetButton.style.opacity = "0"
	resetButton.style.pointerEvents = "none"
}

const convertStringToArr = (str) => {
	str.split(", ").map((s) => {
		let value
		if (typeof s !== "string") {
			value = parseInt(s)
		} else {
			value = s
		}
		currentNumArr.push(value)
	})
	return currentNumArr
}

const showEndString = () => {
	endStringP.innerText = decodedMessage
	endStringP.parentElement.style.display = "flex"
	let mindblown = document.createElement("div")
	let mindblownText = document.createElement("p")
	let dontWorryText = document.createElement("p")
	let timer = document.createElement("p")
	let timerCount = 5000
	dontWorryText.innerText = "(Don't worry, it's just a joke.)"
	dontWorryText.style.fontSize = "14px"
	mindblownText.innerText = "🤯"
	mindblown.style.display = "flex"
	mindblown.style.justifyitems = "center"
	mindblown.style.gap = "10px"
	mindblownText.style.marginLeft = "20px"
	// timer.style.fontSize = "14px"
	mindblown.id = "mindblown"
	mindblown.appendChild(timer)
	mindblown.appendChild(dontWorryText)
	endStringP.parentElement.appendChild(mindblown)
	mindblown.appendChild(timer)
	mindblown.appendChild(mindblownText)
	// set timeout to hide the end string after 5 seconds

	setInterval(() => {
		if (timerCount === 0) {
			timer.innerText = "0"
			return
		}
		timerCount -= 1000
		timer.innerText = `${timerCount / 1000} `
	}, 1000)

	// hide the message after x seconds
	setTimeout(() => {
		endStringP.parentElement.style.display = "none"
		mindblown.innerHTML = ""
	}, 5000)
}

const convertCode = async () => {
	if (input.value.trim() === "") {
		alert("Please enter a series of numbers to convert")
		return
	}
	let endString = convertStringToArr(input.value)
	// console.log("endString", endString)
	const data = await outputData()
	// console.log(data)
	const pyramid = makePyramid(endString)
	if (pyramid == "Invalid pyramid") {
		alert("Invalid encripted message.")
		return
	}
	const endPyramid = endOfPyr(pyramid)
	// console.log("endPyramid", endPyramid)
	decodedMessage = await decodeDataToText(endPyramid, data).then(
		(message) => {
			if (message === "invalid number in sequence") {
				alert("Invalid number in sequence")
				return
			} else {
				return message
			}
		}
	)
	if (decodedMessage === undefined) {
		return
	} else {
		showEndString()
	}
	// console.log("decoded", decodedMessage)
	resetCurrentNum()
}
