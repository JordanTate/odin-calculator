const calculator = document.querySelector('.calculator')

const calculatorInputs = document.querySelectorAll('.btn');
const displayCurrent = document.querySelector('.display-current');
const displayPrevious = document.querySelector('.display-previous');

const storedValues = {
    firstValue: null,
    secondValue: null,
    operator: null,
    operatorSymbol: null
}

// Calculate
function handleOperator(firstValue, secondValue, operator){
    
    let calculatedResult;

    if (operator === 'add'){
        calculatedResult = firstValue + secondValue;
    } else if (operator === 'subtract'){
        calculatedResult = firstValue - secondValue;
    } else if (operator === 'multiply'){
        calculatedResult = firstValue * secondValue;
    } else if (operator === 'divide'){
        // Return Error if Dividing by 0
        if (secondValue === 0){
            alert("Error: Can't Divide by 0");
            return;
        }
        calculatedResult = firstValue / secondValue;
    } else if (operator === 'remainder'){
        calculatedResult = firstValue % secondValue;
    }

    displayCurrent.textContent = String(calculatedResult);
    displayPrevious.textContent = `${firstValue} ${storedValues.operatorSymbol} ${secondValue}`;

    storedValues.firstValue = calculatedResult;

}

calculatorInputs.forEach(input => {
    input.addEventListener('click', () => {
        const inputAction = input.dataset.action;
        const inputType = input.dataset.type;
        const previousInputType = calculator.dataset.previousInputType;
        const calculatorDisplay = displayCurrent.textContent;

        // Number Input
        if (inputType === 'number'){
            // Return Error if Exceeding Max Character Limit
            if (calculatorDisplay.length === 12 && previousInputType !== 'operator'){
                return alert('Error: Too Many Digits');
            }
            // Otherwise Update Display
            if (previousInputType === 'operator'){
                displayPrevious.textContent = String(`${storedValues.firstValue} ${storedValues.operatorSymbol}`);
            }
            if (calculatorDisplay === '0' || previousInputType === 'operator'){
                displayCurrent.textContent = input.value;
            } else {
                displayCurrent.textContent += input.value;
            }
            calculator.dataset.previousInputType = 'number';

        // Decimal Input
        } else if (inputType === 'decimal'){
            if (!calculatorDisplay.includes('.')){
                displayCurrent.textContent += '.';
            }
            calculator.dataset.previousInputType = 'number';

        // Operator & Calculate - If firstValue is assigned, then assign secondValue and Calculate, else assign firstValue
        } else if (inputType === 'operator' || inputType === 'equality'){
            if (storedValues.firstValue && 
                storedValues.operator && 
                previousInputType !== 'operator') {
                
                storedValues.secondValue = parseFloat(calculatorDisplay);
                handleOperator(storedValues.firstValue, storedValues.secondValue, storedValues.operator)

            } else {
                storedValues.firstValue = parseFloat(calculatorDisplay)
            }
            storedValues.operator = inputAction;
            storedValues.operatorSymbol = input.value;
            calculator.dataset.previousInputType = 'operator';

        // Reset Display and storedValues
        } else if (inputType === 'reset'){
            displayCurrent.textContent = 0;
            displayPrevious.textContent = "";
            Object.keys(storedValues).forEach(key => storedValues[key]=null);
        // Delete - Remove Single Digit
        } else if (inputType === 'delete'){
            if (displayCurrent.textContent.length > 1){
                displayCurrent.textContent = displayCurrent.textContent.slice(0, -1);
            } else if (displayCurrent.textContent.length = 1){
                displayCurrent.textContent = '0';
            }
        }
    })
});

window.addEventListener('keydown', (event) => {
    let buttonPressed;
    if (event.key >= 0 && event.key <= 9){
        buttonPressed = document.querySelector(`button[value="${event.key}"]`); 
    } else if (event.key === '+' || 
               event.key === '-' || 
               event.key === '*' || 
               event.key === '/' || 
               event.key === '%' ||
               event.key === '.'){
        buttonPressed = document.querySelector(`button[value="${event.key}"]`);
    } else if (event.key === '=' || event.key === 'Enter'){
        buttonPressed = document.querySelector('#equals-btn');
    } else if (event.key = 'Escape'){
        buttonPressed = docment.querySelector('#reset-btn');
    } else if (event.key = 'Backspace'){
        buttonPressed == document.querySelector('#delete-btn');
    } else {
        return;
    }
    buttonPressed.click();
    buttonPressed.focus();
})