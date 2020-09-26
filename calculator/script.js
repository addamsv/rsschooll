class Calculator {

    constructor(cssSelector="[data-calc-btn]") {

        this.previousOperandTextElement = document.getElementById('previousOperand');
        this.currentOperandTextElement = document.getElementById('currentOperand');
        this.currentOperand = 2;
        this.previousOperand = 4;
        this.operation;
        this.readyToReset;

        this.clear();
        const buttons = document.querySelectorAll(cssSelector);
        for (var i = 0, l = buttons.length; i < l; i++) {
            this.buttonController(buttons[i]);
        }
    }

    /**
     * Controller
     */
    buttonController(btn){
        e = e || window.event;
        e.preventDefault();

        let ob = this; 
        btn.onclick = buttonClickEvent;
        // btn.ontouchend = buttonClickEvent;

        function buttonClickEvent(e) {
            e = e || window.event;
            if(Number.isInteger(parseInt(btn.dataset.calcBtn)) || btn.dataset.calcBtn === '.'){
                console.log(btn.dataset.calcBtn);
                ob.appendNumber(btn.dataset.calcBtn);
                ob.updateDisplay();
            }
            switch(btn.dataset.calcBtn){
                case '=':
                    ob.compute();
                break;
                case 'root':
                    ob.chooseOperation('root');
                break;
                case 'pow':
                    ob.chooseOperation('pow');
                break;
                case '+':
                    ob.chooseOperation('+');
                    ob.summ();
                break;
                case '*':
                    ob.chooseOperation('*');
                break;
                case '/':
                    ob.chooseOperation('/');
                break;
                case '-':
                    ob.chooseOperation('-');
                break;
                case 'AC':
                    ob.clear();
                break;
                case 'DEL':
                    ob.delete();
                break;
            }
            // document.onmouseup = buttonClickEventEnd;
            // document.ontouchend = buttonClickEventEnd;
        }
        // function buttonClickEventEnd() {
        //     document.onmouseup = null;
        //     document.ontouchend = null;
        // }     
    }




    /**
     * Model
     */

    clear(){
        console.log('clear');
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.readyToReset = false;

        this.updateDisplay();
    }
    
    delete() {
        console.log('delete');
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        this.updateDisplay();
    }

    summ(){
        console.log(this.currentOperand + this.previousOperand);
    }

    appendNumber(number) {
        console.log('appendNumber');
        if(number === '.' && this.currentOperand.includes('.')){
            return;
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if(this.currentOperand === ''){
            return;
        }
        if(this.previousOperand !== ''){
            this.compute();
        }
        console.log('choosenOperation: ' + operation);
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute(){
        console.log('compute');
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)){
            return;
        }
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break
            case '-':
                computation = prev - current;
                break
            case '*':
                computation = prev * current;
                break
            case '/':
                computation = prev / current;
                break
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
        this.updateDisplay();
    }

    updateDisplay(){
        console.log('updateDisplay');
        this.currentOperandTextElement.innerText = this.makeSeparatedDigit(this.currentOperand);
        this.previousOperandTextElement.innerText = this.operation ? this.makeSeparatedDigit(this.previousOperand) + ' ' + this.operation : this.makeSeparatedDigit(this.previousOperand);
    }

    makeSeparatedDigit(num){
        const stringNumber = num.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        integerDisplay = (isNaN(integerDigits)) ? '' : integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });

        return  (decimalDigits != null) ? integerDisplay + '.' + decimalDigits : integerDisplay;
    }

}

new Calculator();
