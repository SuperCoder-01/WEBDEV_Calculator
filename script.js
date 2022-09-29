class Calculator {
	constructor(PrevOperandElem, CurrentOperandElem) {
		this.PrevOperandElem = PrevOperandElem
		this.CurrentOperandElem = CurrentOperandElem
		this.clear()
	}

	clear() {
		this.currentOperand = ""
		this.previousOperand = ""
		this.operation = undefined
	}
	delete() {
		this.currentOperand = this.currentOperand.toString().slice(0, -1)
	}
	appendNumber(number) {
		if (number === "." && this.currentOperand.includes(".")) return // Only allows user to add 1 period (.)
		this.currentOperand = this.currentOperand.toString() + number.toString()
	}
	chooseOperation(operation) {
		if (this.currentOperand === "") return
		if (this.previousOperand !== "") {
			this.compute()
		}
		this.operation = operation
		this.previousOperand = this.currentOperand
		this.currentOperand = ""
	}

	compute() {
		let computation
		const Prev = parseFloat(this.previousOperand)
		const Current = parseFloat(this.currentOperand)
		if (isNaN(Prev) || isNaN(Current)) return
		// Check to see which operation
		switch (this.operation) {
			case "+":
				computation = Prev + Current
				break
			case "-":
				computation = Prev - Current
				break
			case "×":
				computation = Prev * Current
				break
			case "÷":
				computation = Prev / Current
				break
			default:
				return
		}
		this.currentOperand = computation
		this.operation = undefined
		this.previousOperand = ""
	}
	updateOutput() {
		this.CurrentOperandElem.innerText = this.getDisplayNumber(this.currentOperand)
		if (this.operation != null) {
			this.PrevOperandElem.innerText = `${this.getDisplayNumber(this.previousOperand)} ${
				this.operation
			}`
        } else {
            this.PrevOperandElem.innerText = ''
        }
	}

	getDisplayNumber(number) {
		const stringNumber = number.toString()
		const integerDigits = parseFloat(stringNumber.split(".")[0])
		const decimalDigits = stringNumber.split(".")[1]
		let integerDisplay
		if (isNaN(integerDigits)) {
			integerDisplay = ""
		} else {
			integerDisplay = integerDigits.toLocaleString("en", { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
	}
}

const Numbers = document.querySelectorAll("[data-number]")
const Operators = document.querySelectorAll("[data-operator]")
const EqualBtn = document.getElementById("equals-btn")
const DeleteBtn = document.getElementById("del-btn")
const ClearBtn = document.getElementById("all-clear-btn")
const PrevOperandElem = document.getElementById("prev-operand")
const CurrentOperandElem = document.getElementById("current-operand")
const calculator = new Calculator(PrevOperandElem, CurrentOperandElem)

// Make all buttons work
Numbers.forEach(number => {
	number.addEventListener("click", () => {
		calculator.appendNumber(number.innerText)
		calculator.updateOutput()
	})
})
Operators.forEach(operation => {
	operation.addEventListener("click", () => {
		calculator.chooseOperation(operation.innerText)
		calculator.updateOutput()
	})
})
EqualBtn.addEventListener("click", button => {
	calculator.compute()
	calculator.updateOutput()
})
ClearBtn.addEventListener("click", button => {
	calculator.clear()
	calculator.updateOutput()
})
DeleteBtn.addEventListener("click", button => {
	calculator.delete()
	calculator.updateOutput()
})
