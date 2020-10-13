
/**
 * 		ADDAMSV CALCULATOR
 *
 *
 * @copyright (c) 2020 S.Adamovich - https://github.com/rolling-scopes-school/addamsv-JS2020Q3/calculator
 * @license GPL 3.0 http://www.gnu.org/licenses/gpl.html
 * @Version: 1.0.0
 *
 * Require: modern browsers
 * Build: 80 (27-SEP-2020)
 * 
 */


/* 
Базовая функциональность
1 + 2 => 3
23 + 69.5 => 92.5
74 * 3 - 5 => 217
2 + 3 => 5 продолжаем ввод 4 => 4 - после равно следующая цифра перезаписывает результат
есть кнопка, позволяющая очистить результат
Дополнительные математические операции
25 √ => 5 или √ 25 => 5 - любой вариант правильный
9 √ + 1 => 4 или √ 9 + 1 => 4 - любой вариант правильный
2 ^ 2 => 4
15 ^ 3 => 3375
10.1 ^ 3 => 1030.301
Действия с отрицательными числами
-9 / -3 => 3
2 + -2 => 0
2 / -2 => -1
-9 ^ 3 => -729
-9 √ => уведомление об ошибке или √ - 9 => уведомление об ошибке - любой вариант правильный
Действия с дробями
0.1 + 0.2 => 0.3
0.4 - 0.1 => 0.3
0.0004 + 0.0004 => 0.0008
-0.1 * 0.2 => -0.02
-0.15 + -0.15 => -0.3 - а не - 0.30


Extended Tests:
8 + - / * 2 = 16
0 / 2 = 0
1 + = = = = 1
3 + 4 ^ 2 = 19 ^ 2 = 361 Multiple degree ERROR Solved

ISSUE:
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

    constructor() {
        this.makeContent();
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

        this.makeButton(ob, 'AC', 'AC', 'span-two');
        this.makeButton(ob, 'DEL', 'DEL', 'span-two');
        this.makeButton(ob, '^', 'pow');
        this.makeButton(ob, '√', 'root');
        this.makeButton(ob, '+/-');
        this.makeButton(ob, '/');
        this.makeButton(ob, '7');
        this.makeButton(ob, '8');
        this.makeButton(ob, '9');
        this.makeButton(ob, '*');
        this.makeButton(ob, '4');
        this.makeButton(ob, '5');
        this.makeButton(ob, '6');
        this.makeButton(ob, '+');
        this.makeButton(ob, '1');
        this.makeButton(ob, '2');
        this.makeButton(ob, '3');
        this.makeButton(ob, '-');
        this.makeButton(ob, '.');
        this.makeButton(ob, '0');
        this.makeButton(ob, '=', '=', 'span-two');
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

    constructor() {

        super();

        this.previousOperandTextElement = document.getElementById('previousOperand');
        this.currentOperandTextElement = document.getElementById('currentOperand');
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
        let current = parseFloat(this.currentOperand);
        // if(isNaN(current)){
            //     console.log('aaa ' + current);
            //     return;
            // }
        if(!this.isPowOperation){
            this.isPowOperation = true;
            this.currentOperandTextElement.innerText = this.makeSeparatedDigit(this.currentOperand) + '^';
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
        // let result = 0;
        if(current < 0){
            alert ('Incorrect argument!');
            current = current * (-1);
            this.currentOperand = current;
            this.currentOperandTextElement.innerText = current;
            return;
        }
        if(current !== 0){
            this.isSqrtOperation = true;
            this.sqrtOperand = current;
            this.compute();
            return;
        }
        if(!this.isSqrtOperation){
            this.isSqrtOperation = true;
            this.currentOperandTextElement.innerText = '√';
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
        if( this.currentOperand === 0 ){
            this.operation = operation;
            this.previousOperandTextElement.innerText = (this.operation && this.previousOperand !== '') ? this.makeSeparatedDigit(this.previousOperand) + ' ' + this.operation : this.makeSeparatedDigit(this.previousOperand);
            return;
        }
        /* case when 8+4+5+4-16...= */
        if(this.previousOperand !== 0 ){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = 0;
        this.previousOperandTextElement.innerText = (this.operation && this.previousOperand !== '') ? this.makeSeparatedDigit(this.previousOperand) + ' ' + this.operation : this.makeSeparatedDigit(this.previousOperand);
        this.currentOperandTextElement.innerText = '0';
    }

    /**
	* @protected Change Sign
	* @return {void}
	*/
    changeSign(){
        if(this.isSqrtOperation){
            this.clear();
            this.currentOperandTextElement.innerText = 'Error: Incorrect argument!';
            /* in real calculator just skip these operations above and button should be depricd*/
            return;
        }
        this.currentOperand *= -1;
        this.currentOperandTextElement.innerText = this.currentOperand;
    }
      
    /**
	* @protected Compute
	* @return {void}
	*/
    compute(){
        let computation;

        const prev = (parseFloat(this.previousOperand) ? parseFloat(this.previousOperand) : 0);

        let current = (parseFloat(this.currentOperand) ? parseFloat(this.currentOperand) : 0);



        // if(!this.isSqrtOperation && (isNaN(prev) || isNaN(current))){return;}
        if(this.isSqrtOperation){
            this.isSqrtOperation = false;
            current = Math.sqrt(this.sqrtOperand, 2); //current = Math.sqrt(current, this.sqrtOperand);
        }
        if(!this.isPowOperation && (isNaN(prev) || isNaN(current))){
            return;
        }
        if(this.isPowOperation){
            current = Math.pow(current, this.powOperand);
            this.isPowOperation = false;
        }
        if(!this.operation){
            computation = current;
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
                if(current == 0){
                    this.clear();
                    this.previousOperandTextElement.innerText =  prev + ' / 0 =' 
                    this.currentOperandTextElement.innerText = 'Error: Incorrect argument!';//alert('Incorrect argument!');
                    return;
                }
                computation = prev / current;
                break;
            case '+/-':
                computation = '-' + current;
                break;
        }
        
        if(computation===Infinity){
            this.clear();
            this.previousOperandTextElement.innerText = '= Infinity'
            this.currentOperandTextElement.innerText = '0';
            return;
        }
        if(computation.toString().slice('').includes('e')){
            this.clear();
            this.previousOperandTextElement.innerText = '=' + computation.toString();
            this.currentOperandTextElement.innerText = '0';
            return;
        }
        this.previousOperandTextElement.innerText = (this.operation ? this.previousOperand + ' ' +  this.operation + ' '  : '') + (this.sqrtOperand ? '√' + this.sqrtOperand :  this.currentOperand ) + (this.powOperand ? '^' + this.powOperand : '') + ' = ' + parseFloat(this.makeValidDigitString(computation));
        this.currentOperand = parseFloat(this.makeValidDigitString(computation));
        this.currentOperandTextElement.innerText = this.currentOperand;
        this.powOperand = '';
        this.sqrtOperand = '';
        this.previousOperand = 0;
        this.operation = undefined;
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
            this.currentOperandTextElement.innerText = this.makeSeparatedDigit(this.currentOperand) + '^' + this.powOperand;
            return;
        }
        if(this.isSqrtOperation){
            this.currentOperandTextElement.innerText = '√' + this.sqrtOperand;
            return;
        }
        this.currentOperandTextElement.innerText = this.makeSeparatedDigit(this.currentOperand);
    }
    
    /**
	* @private	Display the Previouse digit on the screen
	* @return {void}
	*/
    displayPrev(){
        this.previousOperandTextElement.innerText = (this.operation && this.previousOperand != '') ? this.makeSeparatedDigit(this.previousOperand) + ' ' + this.operation : this.makeSeparatedDigit(this.previousOperand);
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

        const buttons = document.querySelectorAll(cssSelector);
        for (var i = 0, l = buttons.length; i < l; i++) {
            this.buttonController(buttons[i]);
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






