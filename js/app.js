class Calculator {

    constructor(preveusOperandTextElement, curentOperandTextElement) {
        this.preveusOperandTextElement = preveusOperandTextElement;
        this.curentOperandTextElement = curentOperandTextElement;
        this.clear();
    }

    clear(){
        this.curentOperand = '';
        this.preveusOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.curentOperand = this.curentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.curentOperand.includes('.')) return
        this.curentOperand = this.curentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.curentOperand === '') return
        if (this.preveusOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.preveusOperand = this.curentOperand;
        this.curentOperand = '';
    }

    compute() {
        let computation
        const prev = parseFloat(this.preveusOperand)
        const current = parseFloat(this.curentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
        case '+':
            computation = prev + current
            break
        case '-':
            computation = prev - current
            break
        case 'x':
            computation = prev * current
            break
        case '/':
            computation = prev / current
            break
        default:
            return
        }
        this.curentOperand = computation
        this.operation = undefined
        this.preveusOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
        integerDisplay = '';
        } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`;
        } else {
        return integerDisplay;
        }
    }

    updateDisplay() {
        this.curentOperandTextElement.innerText = 
            this.getDisplayNumber(this.curentOperand);
        if (this.operation != null) {
            this.preveusOperandTextElement.innerText = 
            `${this.getDisplayNumber(this.preveusOperand)} ${this.operation}`;
        } else {
            this.preveusOperandTextElement.innerText = ''
          }
    }

}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const preveusOperandTextElement = document.querySelector('[data-preveus-operand]');
const curentOperandTextElement = document.querySelector('[data-curent-operand]');

const calculator = new Calculator(preveusOperandTextElement, curentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
});

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});