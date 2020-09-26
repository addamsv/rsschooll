class Calculator {

    constructor(cssSelector="[data-calc-btn]") {
        console.log( 'negative float: ' + (parseFloat('-0.15') + parseFloat('-0.15')) ); 
        this.previousOperandTextElement = document.getElementById('previousOperand');
        this.currentOperandTextElement = document.getElementById('currentOperand');
        this.currentOperand = 2;
        this.previousOperand = 4;
        this.operation;
        this.readyToReset;
        this.isEqualsBtnWasClicked = false;

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
        let ob = this;
        btn.onclick = buttonClickEvent;

        function buttonClickEvent(e) {
            e = e || window.event;
            e.preventDefault();

            if(Number.isInteger(parseInt(btn.dataset.calcBtn)) || btn.dataset.calcBtn === '.'){
                console.log(btn.dataset.calcBtn);
                ob.appendNumber(btn.dataset.calcBtn);
                ob.updateDisplay();
            }
            switch(btn.dataset.calcBtn){
                case '=':
                    ob.compute();
                    ob.isEqualsBtnWasClicked = true;
                    break;
                case 'root':
                    ob.sqrt();
                    break;
                case 'pow':
                    ob.pow();
                    break;
                case '+':
                case '*':
                case '/':
                case '-':
                    ob.standartOperation(btn.dataset.calcBtn);
                    break;
                case 'AC':
                    ob.clear();
                    break;
                case 'DEL':
                    ob.delete();
                    break;
                case '+/-':
                    ob.changeSign();
                    break;
            }
        } 
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
    pow(n = 2) {
        let current = parseFloat(this.currentOperand);
        if(isNaN(current)){
            return;
        }
        current =  Math.pow(current, n);
        console.log('current: ' + current);
        this.currentOperand = current;
        //this.currentOperandTextElement.innerText = current;
        this.previousOperand = 'pow';
        this.updateDisplay();
    }
    sqrt(n = 2) {
        let current = parseFloat(this.currentOperand);
        if(isNaN(current)){
            return;
        }
        current =  Math.sqrt(current, n);
        console.log('current: ' + current);
        this.currentOperand = current;
        this.currentOperandTextElement.innerText = current;
    }
    appendNumber(number) {
        console.log('appendNumber');
        if(this.isEqualsBtnWasClicked){
            this.currentOperand = '';
            this.isEqualsBtnWasClicked = false;
        }
        if(number === '.' && this.currentOperand.includes('.')){
            return;
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    standartOperation(operation) {
        if(this.currentOperand === '' || this.currentOperand === '0'){
            return;
        }

        if(this.previousOperand !== ''){
            console.log('----stage3: '+this.previousOperand +' '+this.currentOperand);
            this.compute();
        }
        console.log('choosenOperation: ' + operation);
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        this.previousOperandTextElement.innerText = (this.operation && this.previousOperand !== '') ? this.makeSeparatedDigit(this.previousOperand) + ' ' + this.operation : this.makeSeparatedDigit(this.previousOperand);
        this.currentOperandTextElement.innerText = '0';
    }
    changeSign(){
        this.currentOperand *= -1;
        this.currentOperandTextElement.innerText = this.currentOperand;
        console.log('this.currentOperand: '+this.currentOperand);
    }

    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        console.log('compute: ' + this.operation + ' ' + (isNaN(prev) || isNaN(current))) ;
        if(isNaN(prev) || isNaN(current)){
            return;
        }
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            case '+/-':
                computation = '-' + current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        //this.operation = '=';//undefined;
        this.previousOperand = '';
        this.updateDisplay();
    }

    updateDisplay(){
        console.log('updateDisplay: '+this.operation);
        this.currentOperandTextElement.innerText = this.makeSeparatedDigit(this.currentOperand);
        this.previousOperandTextElement.innerText = (this.operation && this.previousOperand != '') ? this.makeSeparatedDigit(this.previousOperand) + ' ' + this.operation : this.makeSeparatedDigit(this.previousOperand);
    }

    makeSeparatedDigit(num){
        const stringNumber = num.toString();
        const numSign = (stringNumber.substr(0,1) === '-') ? '-' : '';
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        console.log('stage4: '+stringNumber);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        integerDisplay = (isNaN(integerDigits)) ? numSign+'' : numSign + integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });

        return  (decimalDigits != null) ? integerDisplay + '.' + decimalDigits : integerDisplay;
    }

}

new Calculator();
