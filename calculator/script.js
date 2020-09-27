class Calculator {

    constructor(cssSelector="[data-calc-btn]") {
        this.previousOperandTextElement = document.getElementById('previousOperand');
        this.currentOperandTextElement = document.getElementById('currentOperand');
        this.currentOperand = 2;
        this.previousOperand = 4;
        this.powOperand = '';
        this.operation;
        this.readyToReset;

        /**
         * Flags
         */
        this.isEqualsBtnWasClicked = false;
        this.isPowOperation = false;

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
        btn.ontouchend = buttonClickEvent;

        function buttonClickEvent(e) {
            e = e || window.event;
            e.preventDefault();

            if(Number.isInteger(parseInt(btn.dataset.calcBtn)) || btn.dataset.calcBtn === '.'){
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
     *      MODEL
     */





    clear(){
        console.log('clear');
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.readyToReset = false;
        this.isPowOperation = false;

        this.updateDisplay();
    }
    
    delete() {
        console.log('delete');
        if(this.isPowOperation){
            this.powOperand = this.powOperand.toString().slice(0, -1);
        }
        else {
            this.currentOperand = this.currentOperand.toString().slice(0, -1);
        }
        this.updateDisplay();
    }
    pow(n = 2) {
        let current = parseFloat(this.currentOperand);
        if(isNaN(current)){
            return;
        }
        if(!this.isPowOperation){
            this.isPowOperation = true;
            this.currentOperandTextElement.innerText = this.makeSeparatedDigit(this.currentOperand) + '^';
            return;
        }
        return;
        // current =  Math.pow(current, n);
        // console.log('current: ' + current);
        // this.currentOperand = current;
        // //this.currentOperandTextElement.innerText = current;
        // //this.previousOperand = 'pow';

        // this.updateDisplay();
    }
    sqrt(n = 2) {
        let current = parseFloat(this.currentOperand);
        if(current < 0){
            alert ('Incorrect argument!');
            current = current * (-1);
            this.currentOperand = current;
            this.currentOperandTextElement.innerText = current;
            return;
        }
        if(isNaN(current)){
            return;
        }
        current =  Math.sqrt(current, n);
        console.log('current: ' + current);
        this.currentOperand = current;
        
        this.currentOperandTextElement.innerText = this.makeSeparatedDigit(current);
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
        if(this.isPowOperation){
            this.powOperand = this.powOperand.toString() + number.toString();
            console.log('powOperand: ' + this.powOperand);
            return;
        }
        this.currentOperand = this.makeValidDigitString(this.currentOperand.toString() + number.toString());
    }

    /**
	* @private Change Sign
	*
	* @return {void}
	*/
    standartOperation(operation) {
        if(this.currentOperand === '' || this.currentOperand === '0'){
            return;
        }
        if(this.previousOperand !== ''){
            this.compute();
        }
        console.log('choosenOperation: ' + operation);
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        this.previousOperandTextElement.innerText = (this.operation && this.previousOperand !== '') ? this.makeSeparatedDigit(this.previousOperand) + ' ' + this.operation : this.makeSeparatedDigit(this.previousOperand);
        this.currentOperandTextElement.innerText = '0';
    }

    /**
	* @private Change Sign
	*
	* @return {void}
	*/
    changeSign(){
        this.currentOperand *= -1;
        this.currentOperandTextElement.innerText = this.currentOperand;
        console.log('this.currentOperand: '+this.currentOperand);
    }
      
    /**
	* @private Compute
	*
	* @return {void}
	*/
    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        let current = parseFloat(this.currentOperand);
        console.log('isPowOperation: '+this.isPowOperation);
        if(!this.isPowOperation && (isNaN(prev) || isNaN(current))){
            return;
        }
        if(this.isPowOperation){
            current = Math.pow(current, this.powOperand);
            this.isPowOperation = false;
            console.log('computation: ' + current);
        }
        if(!this.operation){
            computation = current;
        }
        switch (this.operation) {
            case '+':
                console.log('prev + current = ' + (prev + current));
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
            // default:
            //     return;
        }

        this.currentOperand = parseFloat(this.makeValidDigitString(computation));
        this.powOperand = '';
        //this.operation = '=';//undefined;
        this.previousOperand = '';
        this.updateDisplay();
    }
    
    /**
	* @private	Display the Current and Previouse digit on the screen
	*
	* @return {void}
	*/ 
    updateDisplay(){
        this.displayCurrent();
        this.displayPrev();
    }
       
    /**
	* @private	Display the Current digit on the screen
	*
	* @return {void}
	*/ 
    displayCurrent(){
        if(!this.isPowOperation){
            this.currentOperandTextElement.innerText = this.makeSeparatedDigit(this.currentOperand);
            return;
        }
        this.currentOperandTextElement.innerText = this.makeSeparatedDigit(this.currentOperand) + '^' + this.powOperand;
    }
    
    /**
	* @private	Display the Previouse digit on the screen
	*
	* @return {void}
	*/
    displayPrev(){
        this.previousOperandTextElement.innerText = (this.operation && this.previousOperand != '') ? this.makeSeparatedDigit(this.previousOperand) + ' ' + this.operation : this.makeSeparatedDigit(this.previousOperand);
    }
    
    /**
	* @private	Retrieve a comma/dot separated digit to display on the screen
	*
	* @param  {Number} num - digit 
	* @return {String} digit
	*/
    makeSeparatedDigit(num){
        let decimal = this.getIntegerDigitString(num);
        return this.getNumSign(num) + decimal.toLocaleString('en', { maximumFractionDigits: 0 }) + this.getDecimalDigitString(num);
    }
    
    /**
	* @private	Retrieve a validated digit
	*
	* @param  {Number} num - digit 
	* @return {String} digit
	*/
    makeValidDigitString(num){
        console.log('makeValidDigitString:' + num + ' return: ' +this.getNumSign(num) + this.getIntegerDigitString(num) + this.getDecimalDigitString(num));
        return this.getNumSign(num) + this.getIntegerDigitString(num) + this.getDecimalDigitString(num);  
    }
    
    /**
	* @private	Retrieve a negative or positive(nothing) symbol
	*
	* @param  {Number} num - a integer part of a digit
	* @return {String} sign
	*/
    getNumSign(num){
        return (num.toString().substr(0,1) === '-') ? '-' : '';
    }
    
    /**
	* @private	Retrieve a integer part of the Digit
	*
	* @param  {Number} num - a integer part of a digit
	* @return {Number} not more than 14 simbols
	*/
    getIntegerDigitString(num){
        console.log('num: ' + num + 'getIntegerDigitString: ' + num.toString().split('.')[0]);
        return this.getValidIntegerDigitString(num.toString().split('.')[0]);
    }
    
    /**
	* @private	Validation of the integer part of the Digit
	*
	* @param  {String} stringNumber - a integer part of a digit
	* @return {Number} not more than 14 simbols
	*/
    getValidIntegerDigitString(stringNumber){
        let val = (stringNumber && stringNumber.length >= 15) ? stringNumber.substr(0, 14) : stringNumber;
        val = parseInt(val);
        return (isNaN(val)) ? 0 : Math.abs(val);
    }
    
    /**
	* @private	Retrieve a decimal part of the Digit
	*
	* @param  {Number} num - a decimal part of a digit
	* @return {String} not more than 14 simbols
	*/
    getDecimalDigitString(num){
        //let outData = 
        console.log('num:' +num+ '   Decimal ' +num.toString().split('.')[1])
        return this.getValidDecimalDigitString(num.toString().split('.')[1]);//outData === '' ? '' : '.' + outData;
    }
    
    /**
	* @private	Validation of the decimal part of the Digit
	*
	* @param  {String} stringNumber - a decimal part of a digit
	* @return {String} not more than 14 simbols
	*/
    getValidDecimalDigitString(stringNumber){
        if(stringNumber === undefined){
            return '';
        }
        return (stringNumber.length >= 15) ? '.' + stringNumber.substr(0, 14) : '.' + stringNumber;
    }

}

new Calculator();


