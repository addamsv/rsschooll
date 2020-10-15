
/**
 * 		ADDAMSV CALCULATOR
 *
 *
 * @copyright (c) 2020 S.Adamovich - https://github.com/rolling-scopes-school/addamsv-JS2020Q3/calculator
 * @license GPL 3.0 http://www.gnu.org/licenses/gpl.html
 * @Version: 1.0.0
 *
 * Require: modern browsers (NOT IE BECAUSE OF 'extends' does't work over there)
 * Build: 80 (27-SEP-2020)
 * 
 */







/**
 * 
 * 
 *  Class CalculatorView
 * 
 *           VIEW
 * 
 * 
 * 
 * 
 */
   
class CalculatorView {

    constructor(isAPIorTestMode) {
        if(!isAPIorTestMode){
            this.makeContent();
        }
    }

    /**
	* @private	Make Content Within "calculator-grid" css class
	* @return {void}
	*/
     makeContent(cssSelector='.calculator-grid'){
        const containers = document.querySelectorAll(cssSelector);
        for (var i = 0, l = containers.length; i < l; i++) {
            this.makeDisplay(containers[i]);
        }
     }
    

    /**
	* @private	Make Content Within "calculator-grid" css class
	* @return {void} 
	*/
     makeDisplay(ob){
        var
            newNode,
             newNodeInner;

            newNode = document.createElement('div');
            newNode.className = 'output';
                newNodeInner = document.createElement('div');
                newNodeInner.className = 'previous-operand';
                newNodeInner.id = 'previousOperand';
                newNode.appendChild(newNodeInner);
                newNodeInner = document.createElement('div');
                newNodeInner.className = 'current-operand';
                newNodeInner.id = 'currentOperand';
                newNode.appendChild(newNodeInner);
            
        ob.appendChild(newNode);

        this.makeButton(ob, 'AC', 'AC', 'span-two fn-btn ac-dell-btn');
        this.makeButton(ob, 'x', 'DEL', 'span-two fn-btn ac-dell-btn del-btn');
        this.makeButton(ob, '^', 'pow','fn-btn');//X<sup><small>n</small></sup> may be but... you know what...
        this.makeButton(ob, '√', 'root','fn-btn');
        this.makeButton(ob, '±','+/-','fn-btn');
        this.makeButton(ob, '/','','fn-btn');
        this.makeButton(ob, '7');
        this.makeButton(ob, '8');
        this.makeButton(ob, '9');
        this.makeButton(ob, '*','','fn-btn');
        this.makeButton(ob, '4');
        this.makeButton(ob, '5');
        this.makeButton(ob, '6');
        this.makeButton(ob, '+','','fn-btn');
        this.makeButton(ob, '1');
        this.makeButton(ob, '2');
        this.makeButton(ob, '3');
        this.makeButton(ob, '-','','fn-btn');
        this.makeButton(ob, '.');
        this.makeButton(ob, '0');
        this.makeButton(ob,  "", '=', 'span-two equal-btn');
     }

    /**
	* @private	Make Content Within "calculator-grid" css class
	* @return {void}
	*/
     makeButton(ob, text, dataVal='',  cssClass = ''){
        let newNode = document.createElement('button');
        if(cssClass !== ''){
            newNode.className = cssClass;
        }
        newNode.innerText = text;
        if(dataVal === ''){
            dataVal = text;
        }
        newNode.dataset.calcBtn = dataVal;   
        ob.appendChild(newNode);    
    }


}



/**
 *     Class CalculatorModel
 * 
 * 
 *          MODEL
 *  
 * 
 * 
 */
class CalculatorModel extends CalculatorView {

    constructor(_isAPIorTestMode = false) {
        super(_isAPIorTestMode);
        this.isAPIorTestMode = _isAPIorTestMode;
        
        this.previousOperandTextElement = (!this.isAPIorTestMode) ? document.getElementById('previousOperand') : '';
        this.currentOperandTextElement = (!this.isAPIorTestMode) ?  document.getElementById('currentOperand') : '';
        this.currentOperand = 2;
        this.previousOperand = 4;
        this.powOperand = '';
        this.sqrtOperand = '';
        this.operation;
        this.readyToReset;

        /**
         * Flags
         */
        this.isEqualsBtnWasClicked = false;
        this.isPowOperation = false;
        this.isSqrtOperation = false;

        this.clear();
    }


   /**
	* @protected Return All vars to start position
	* @return {void}
	*/
    clear(){
        this.currentOperand = 0;
        this.previousOperand = 0;
        this.operation = undefined;
        this.readyToReset = false;
        this.isPowOperation = false;
        this.isSqrtOperation = false;
        this.powOperand = '';
        this.sqrtOperand = '';
        this.updateDisplay();
        return 0;
    }

    /**
	* @protected Remove last digit from the currentOperand
	* @return {void}
	*/
    delete() {
        if(this.isSqrtOperation){
            this.sqrtOperand = this.sqrtOperand.toString().slice(0, -1);
        }
        else if(this.isPowOperation){
            this.powOperand = this.powOperand.toString().slice(0, -1);
        }
        else {
            this.currentOperand = this.currentOperand.toString().slice(0, -1);
        }
        this.updateDisplay();
    }

   /**
	* @protected Power operation
	* @param  {Number} n 
	* @return {void}
	*/
    pow(n = 2) {
        const CURRENT = parseFloat(this.currentOperand) ? parseFloat(this.currentOperand) : 0;
        if(!this.isPowOperation){
            this.isPowOperation = true;
            if(!this.isAPIorTestMode){
                this.currentOperandTextElement.innerText = this.makeSeparatedDigit(CURRENT) + '^';
            }
            return;
        }
        return;
    }

   /**
	* @protected Sqrt operation
	* @param  {Number} n 
	* @return {void}
	*/
    sqrt(n = 2) {
        let current = parseFloat(this.currentOperand);
        if(current !== 0){
            this.isSqrtOperation = true;
            this.sqrtOperand = current;
            return this.compute();
        }
        if(!this.isSqrtOperation){
            this.isSqrtOperation = true;
            if(!this.isAPIorTestMode){
                this.currentOperandTextElement.innerText = '√';
            }
            return;
        }  
    }

   /**
	* @protected Change Sign
	* @param  {String} number 
	* @return {void}
	*/
    appendNumber(number) {
        if(this.isPowOperation){
            if (number === '.'){
                return;
            }
            this.powOperand = this.powOperand.toString() + number.toString();
            return;
        }
        if(this.isEqualsBtnWasClicked){
            this.currentOperand = 0;
            this.isEqualsBtnWasClicked = false;
        }
        /* max allowed dig */
        if(this.currentOperand.toString().length > 14){
            return;
        }
        if(number === '.' && this.currentOperand.toString().includes('.')){
            return;
        }
        if(this.isSqrtOperation){
            if (number === '.'){
                return;
            }
            this.sqrtOperand = this.sqrtOperand.toString() + number.toString();//'√' +
            return;
        }

        this.currentOperand = this.makeValidDigitString(this.currentOperand.toString() + number.toString());
    }

    /**
	* @protected Operation || Change Operation.. 
	* @param  {String} operation
	* @return {void}
	*/
    standartOperation(operation) {
        /* case when 8+4+-/2=6 */
        if((this.currentOperand === 0 || this.currentOperand==='') && !this.isPowOperation && !this.isSqrtOperation){
            this.operation = operation;
            if(!this.isAPIorTestMode){
                this.previousOperandTextElement.innerText = (this.operation && this.previousOperand !== '') ? this.makeSeparatedDigit(this.previousOperand) + ' ' + this.operation : this.makeSeparatedDigit(this.previousOperand);
            }
            return;
        }
        /* case when 8+4+5+4-16...= */
        if(this.previousOperand !== 0 || this.isPowOperation || this.isSqrtOperation){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        if(this.previousOperand===''){
            this.previousOperand = 0;
        }
        this.currentOperand = 0;
        if(!this.isAPIorTestMode){
            if(this.previousOperand == 0){
                this.previousOperand = 0;
            }
            this.previousOperandTextElement.innerText = (this.operation && this.previousOperand !== '') ? this.makeSeparatedDigit(this.previousOperand) + ' ' + this.operation : this.makeSeparatedDigit(this.previousOperand);
            this.currentOperandTextElement.innerText = '0';
        }
    }

    /**
	* @protected Change Sign
	* @return {void}
	*/
    changeSign(){
        if(this.isPowOperation){
            this.powOperand *= -1;
            if(!this.isAPIorTestMode){
                this.currentOperandTextElement.innerText = this.makeSeparatedDigit(this.currentOperand) + '^' + this.powOperand;
            }
            return;
        }
        if(this.isSqrtOperation){
            this.clear();
            if(!this.isAPIorTestMode){
                this.currentOperandTextElement.innerText = 'Error: Incorrect argument!';
            }
            return 'Error: Incorrect argument!';
        }
        this.currentOperand *= -1;
        if(!this.isAPIorTestMode){
            this.currentOperandTextElement.innerText = this.currentOperand;
        }
    }
      
    /**
    * Sorry someone for that kind of code 
	* @protected Compute
	* @return {String}
	*/
    compute(){
        let computation;
        let current = (parseFloat(this.currentOperand) ? parseFloat(this.currentOperand) : 0);
        const PREV = (parseFloat(this.previousOperand) ? parseFloat(this.previousOperand) : 0);

        if(this.isSqrtOperation){
            if(this.currentOperand < 0){
                this.clear();
                if(!this.isAPIorTestMode){
                    this.currentOperandTextElement.innerText = 'Error: Incorrect argument!';
                }
                return 'Error: Incorrect argument!';
            }
            if(this.sqrtOperand < 0){
                return 'Error: Incorrect argument!';
            }
            if(isNaN(this.sqrtOperand)){
                this.sqrtOperand = 0;
            }
            this.isSqrtOperation = false;
            current = Math.sqrt(this.sqrtOperand, 2); //current = Math.sqrt(current, this.sqrtOperand);
        }

        if(this.isPowOperation){
            if(this.powOperand===''){
                this.powOperand = 0;
            }
            current = Math.pow(current, this.powOperand);
            this.isPowOperation = false;
        }
        if(!this.operation){
            computation = current;
        }
        switch (this.operation) {
            case '+':
                computation = PREV + current;
                break;
            case '-':
                computation = PREV - current;
                break;
            case '*':
                computation = PREV * current;
                break;
            case '/':
                if(current == 0){
                    this.clear();
                    if(!this.isAPIorTestMode){
                        this.previousOperandTextElement.innerText =  PREV + ' / 0 =' 
                        this.currentOperandTextElement.innerText = 'Error: Incorrect argument!';
                    }
                    return 'Error: Incorrect argument!';
                }
                computation = PREV / current;
                break;
            case '+/-':
                computation = '-' + current;
                break;
        }
        
        if(computation===Infinity){
            this.clear();
            if(!this.isAPIorTestMode){
                this.previousOperandTextElement.innerText = '= Infinity'
                this.currentOperandTextElement.innerText = '0';
            }
            return 'Infinity';
        }
        if(computation.toString().slice('').includes('e')){
            this.clear();
            if(!this.isAPIorTestMode){
                this.previousOperandTextElement.innerText = '=' + computation.toString();
                this.currentOperandTextElement.innerText = '0';
            }
            return computation.toString();
        }
        if(computation.toString().slice('').includes('.')){
            if(computation >= 1000000000){
                computation = (Math.round(computation*100))/100;
            }
            else if(computation < 1000000000 && computation > 1000000){
                computation = (Math.round(computation*1000))/1000;
            }
            else if(computation < 1000000 && computation > 100){
                computation = (Math.round(computation*100000000))/100000000;
            }
            else if(computation < 100){
                computation = (Math.round(computation*1000000000000))/1000000000000;
            }
        }
        if(this.previousOperand === ''){
            this.previousOperand = 0;
        }
        if(this.currentOperand === ''){
            this.currentOperand = 0;
        }
        if(!this.isAPIorTestMode){
            if(this.previousOperand == 0){
                this.previousOperand = 0;
            }
            this.previousOperandTextElement.innerText = (this.operation ? this.previousOperand + ' ' +  this.operation + ' '  : '') + (this.sqrtOperand!=='' ? '√' + this.sqrtOperand :  this.currentOperand ) + (this.powOperand!=='' ? '^' + this.powOperand : '') + ' = ' + parseFloat(this.makeValidDigitString(computation));
        }
        this.currentOperand = parseFloat(this.makeValidDigitString(computation));
        if(!this.isAPIorTestMode){
            this.currentOperandTextElement.innerText = this.currentOperand;
        }
        this.powOperand = '';
        this.sqrtOperand = '';
        this.previousOperand = 0;
        this.operation = undefined;
        return this.currentOperand;
    }
    
    /**
	* @protected	Display the Current and Previouse digit on the screen
	* @return {void}
	*/ 
    updateDisplay(){
        this.displayCurrent();
        this.displayPrev();
    }
       
    /**
	* @private	Display the Current digit on the screen
	* @return {void}
	*/ 
    displayCurrent(){
        if(this.isPowOperation){
            if(!this.isAPIorTestMode){
                this.currentOperandTextElement.innerText = this.makeSeparatedDigit(this.currentOperand) + '^' + this.powOperand;
            }
            return;
        }
        if(this.isSqrtOperation){
            if(!this.isAPIorTestMode){
                this.currentOperandTextElement.innerText = '√' + this.sqrtOperand;
            }
            return;
        }
        if(!this.isAPIorTestMode){
            this.currentOperandTextElement.innerText = this.makeSeparatedDigit(this.currentOperand);
        }
    }
    
    /**
	* @private	Display the Previouse digit on the screen
	* @return {void}
	*/
    displayPrev(){
        if(!this.isAPIorTestMode){
            if(this.previousOperand == 0){
                this.previousOperand = 0;
            }
            this.previousOperandTextElement.innerText = (this.operation && this.previousOperand != '') ? this.makeSeparatedDigit(this.previousOperand) + ' ' + this.operation : this.makeSeparatedDigit(this.previousOperand);
        }
    }
    
    /**
	* @private	Retrieve a comma/dot separated digit to display on the screen

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







/**
 *      ENTRY POINT - class Calculator
 * 
 * 
 *        
 *         CONTROLLER
 * 
 * 
 * 
 * 
 * 
 */
class Calculator extends CalculatorModel {

    constructor(cssSelector="[data-calc-btn]") {
        super();

        // console.log(window.navigator.userAgent.toLowerCase());


        
        (this.isInternetExplorer() === true) ? alert('The Calculator wont work because of not support grid and OOP' ) : '' ;

        const BUTTONS = document.querySelectorAll(cssSelector);
        for (var i = 0, l = BUTTONS.length; i < l; i++) {
            this.buttonController(BUTTONS[i]);
        }
    }

    isInternetExplorer() {
        return window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
    }



    /**
	* @private	Controlls all button we have
	*
	* @param  {JSON} btn - Object of the Button
	* @return {void} 
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

}


/**
 *      Calculator
 * 
 * 
 *        
 *         API
 * 
 * 
 * 
 * 
 * 
 */
class CalculatorAPI extends CalculatorModel {

    constructor(apiTestMode) {
        super(apiTestMode);
    }

    /**
	* @public	Use for tests, further dev with Sequence (complicated stuff) and another JS app
	*
	* @param  {String} sequence - String Sequence of operators and operands separated by one-gap between, with equal (=) operator at the end
	* @return {String} result
	*/
    setSequence(sequence = '1 + 1 ='){
        let result = '';
        sequence = sequence.split(' ');
        for(let i=0, l=sequence.length; i<l; i++){
            if(Number.isInteger(parseInt(sequence[i])) || sequence[i] === '.'){
                if(sequence[i].length > 14){
                    return 'Error: Incorrect argument!';
                }
                this.appendNumber(sequence[i]);
                this.updateDisplay();
            }
            switch(sequence[i]){
                case '=':
                    result = this.compute();
                    this.isEqualsBtnWasClicked = true;
                    break;
                case 'root':
                    result = this.sqrt();
                    break;
                case 'pow':
                    this.pow();
                    break;
                case '+':
                case '*':
                case '/':
                case '-':
                    this.standartOperation(sequence[i]);
                    break;
                case 'AC':
                    result = this.clear();
                    break;
                case 'DEL':
                    this.delete();
                    break;
                case '+/-':
                    result = this.changeSign();
                    if(result==='Error: Incorrect argument!'){
                        return result;
                    }
                    break;
            }
        }
        return result;

    }
}
