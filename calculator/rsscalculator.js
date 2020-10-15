
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
        this.makeButton(ob, 'DEL', 'DEL', 'span-two fn-btn ac-dell-btn');
        this.makeButton(ob, '^', 'pow','fn-btn');
        this.makeButton(ob, '√', 'root','fn-btn');
        this.makeButton(ob, '+/-','','fn-btn');
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
        this.makeButton(ob,  "", '=', 'span-two equal-btn');//&#61;
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
	* @protected Compute
	* @return {String}
	*/
    compute(){
        let computation;
        let current = (parseFloat(this.currentOperand) ? parseFloat(this.currentOperand) : 0);

        const PREV = (parseFloat(this.previousOperand) ? parseFloat(this.previousOperand) : 0);


        // if(!this.isSqrtOperation && (isNaN(PREV) || isNaN(current))){
        //     return;
        // }
        if(this.isSqrtOperation){
            if(this.currentOperand < 0){
                // alert ('Incorrect argument!');
                // current = current * (-1);
                // this.currentOperand = current;
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
        // if(!this.isPowOperation && (isNaN(PREV) || isNaN(current))){
        //     return;
        // }
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
                // 999999999999.3
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
            this.previousOperandTextElement.innerText = (this.operation ? this.previousOperand + ' ' +  this.operation + ' '  : '') + (this.sqrtOperand!=='' ? '√' + this.sqrtOperand :  this.currentOperand ) + (this.powOperand!=='' ? '^' + this.powOperand : '') + ' = ' + parseFloat(this.makeValidDigitString(computation));
        }
        // this.previousOperandTextElement.innerText = (this.operation ? PREV + ' ' +  this.operation + ' '  : '') + (this.sqrtOperand!=='' ? '√' + this.sqrtOperand :  current ) + (this.powOperand!=='' ? '^' + this.powOperand : '') + ' = ' + parseFloat(this.makeValidDigitString(computation));
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



class CalculatorAPI extends CalculatorModel {

    constructor(apiTestMode) {
        super(apiTestMode);
    }

    /**
	* @public	Controlls all button we have
	*
	* @param  {string} btn - Object of the Button
	* @return {void}
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

2 + 5 del √ + 5 => Nan Solved
√ => 0 Solved
9 * / del / сбрасывает пред операнд Solved
0 ^ 0 => 1^0=1 False Solved
^ =>  1^0=1 False Solved
del ^ => Solved
5 del ^ => 1^0=1 False Solved
2 ^ 1 +/- ISSUE changed prev Solved
2 ^ 2 +/- Solved
√ 9 + 1 => Solved
2 ^ 2 + 1 =>  Solved
 
ISSUE:
2 ^ +/-  it adds 0
 */


const TEST = new CalculatorAPI(true);

let test = '';
let br = "\n";

test+='/* Базовая функциональность */' + br;
test+=(TEST.setSequence('1 + 2 =') === 3) + ' 1 + 2 = 3'+br;
test+=(TEST.setSequence('23 + 69.5 =') === 92.5 ) + ' 23 + 69.5 =92.5' + br;
test+=(TEST.setSequence('74 * 3 - 5 =') === 217) + ' 74 * 3 - 5 = 217' + br;
test+=(TEST.setSequence('2 + 3 = 4 =') === 4) + ' 2 + 3 = 4 = 4 ' + 'после равно следующая цифра перезаписывает результат' + br;
test+=(TEST.setSequence('5 AC') === 0) + ' AC - есть кнопка позволяющая очистить результат' + br;

test+=br + '/* Дополнительные математические операции */' + br;
test+=(TEST.setSequence('25 root') === 5) + ' 25 root = 5' + br;
test+=(TEST.setSequence('AC root 25 =') === 5) +  ' AC root 25 = 5' + br;
test+=(TEST.setSequence('9 root + 1 =') === 4) +  ' 9 root + 1 = 4' + br;
test+=(TEST.setSequence('2 pow 2 =') === 4) +  ' 2 pow 2 = 4' + br;
test+=(TEST.setSequence('15 pow 3 =') === 3375) +  ' 15 pow 3 = 3375' + br;
test+=(TEST.setSequence('10.1 pow 3 =') === 1030.301) +  ' 10.1 pow 3 = 1030.301' + br;

test+=br + '/* Действия с отрицательными числами */' + br;
test+=(TEST.setSequence('9 +/- / 3 +/- =') === 3) +  ' 9 +/- / 3 +/- = 3' + br;
test+=(TEST.setSequence('2 + 2 +/- =') === 0) +  ' 2 + 2 +/- = 0' + br;
test+=(TEST.setSequence('2 / 2 +/- =') === -1) +  ' 2 / 2 +/- = -1' + br;
test+=(TEST.setSequence('9 +/- pow 3 =') === -729) +  ' 9 +/- pow 3 = -729' + br;
test+=(TEST.setSequence('9 +/- root') === 'Error: Incorrect argument!') + ' 9 +/- root -> Error: Incorrect argument!' + br;
test+=(TEST.setSequence('AC root 9 +/- =') === 'Error: Incorrect argument!') + ' root 9 +/- = ->Error: Incorrect argument!' + br;
test+=(TEST.setSequence('AC root 9 +/- + 1 =') === 'Error: Incorrect argument!') + ' root 9 +/-  + 1 = ->Error: Incorrect argument!' + br;

test+=br + '/* Действия с дробями: */' + br;
test+=(TEST.setSequence('0.1 + 0.2 =') === 0.3 )+  ' 0.1 + 0.2 = 0.3' + br;
test+=(TEST.setSequence('0.4 - 0.1 =') === 0.3) +  ' 0.4 - 0.1 = 0.3' + br;
test+=(TEST.setSequence('0.3 - 0.2 =') === 0.1) +  ' 0.3 - 0.2 = 0.1' + br;
test+=(TEST.setSequence('0.0004 + 0.0004 =') === 0.0008 ) +  ' 0.0004 + 0.0004 = 0.0008' + br;
test+=(TEST.setSequence('0.1 +/- * 0.2 =') === -0.02) +  ' 0.1 +/- * 0.2 = -0.02' + br;
test+=(TEST.setSequence('0.15 +/- + 0.15 +/- =') === -0.3) +  ' 0.15 +/- + 0.15 +/- = -0.3' + br;

test+=br + '/* Big Digit Tests: */' + br;
test+=(TEST.setSequence('9999999999999999999999999999999999999999999999999999999999 + 1 =') === 'Error: Incorrect argument!') + ' 9999999999999999999999999999999999999999999999999999999999 + 1 = -> Error: Incorrect argument! You arent alowed to text such a big digit within RSSCalculatorAPI' + br;
test+=(TEST.setSequence('99999999999999 * 99999999 =') === 99999998999990) + '  99999999999999 * 99999999 = 99999998999990' + br;
test+=(TEST.setSequence('999999999999.3 - 0.2 =') === 999999999999.1) + '  99999999999999.3 - 0.2 = 99999999999999.1' + br;
test+=(TEST.setSequence('10000000000000 + 1 =') === 1000000000001) + ' 10000000000000 + 1 = 10000000000001' + br;
test+=(TEST.setSequence('10 pow 10000 =') === 'Infinity') + ' 10 pow 10000 = Infinity' + br;
test+=(TEST.setSequence('10 pow 100 =') === '1.0000000000000002e+100') + ' 10 pow 100 = 1.0000000000000002e+100' + br;

test+=br + '/* Crush Tests: */' + br;
test+=(TEST.setSequence('9 / 0 =') === 'Error: Incorrect argument!') + ' 9 / 0 = Error: Incorrect argument!' + br;
test+=(TEST.setSequence('0 / 2 =') === 0) + ' 0 / 2 = 0'+ br;
test+=(TEST.setSequence('8 + - / * 2 =') === 16) + ' 8 + - / * 2 = 16' + br;
test+=(TEST.setSequence('1 + = = = =') === 1) + ' 1 + = = = = 1 ' + br;
test+=(TEST.setSequence('3 + 4 pow 2 = pow 2 =') === 361) + ' 3 + 4 pow 2 = pow 2 = 361' + br;
test+=(TEST.setSequence('3 + 4 pow 2 = 19 pow 2 =') === 361 ) + ' 3 + 4 pow 2 = 19 pow 2 = 361 (Multiple degree ERROR Solved)' + br;
test+=(TEST.setSequence('2 + 5 DEL root + 4 =') === 6) + ' ' + '2 + 5 del root + 4 = 6' + br;
test+=(TEST.setSequence('AC root =') === 0 )+ ' ' + 'root = 0' + br;
test+=(TEST.setSequence('2 pow 2 + 1 =') === 5) + ' ' + '2 ^ 2 + 1 = 5' + br;
test+=(TEST.setSequence('2 pow 2 + 1 =') === 5) + ' ' + '2 ^ 2 + 1 = 5' + br;
test+=(TEST.setSequence('9 * / del / + 1 =') === 10) + ' ' + '9 * / del / + 1 = 10' + 'сбрасывает пред операн' + br 
test+=(TEST.setSequence('AC 9 root + 1 =') === 4) + ' ' + '√ 9 + 1 = 4' + br;
test+=(TEST.setSequence('AC 2 pow 1 +/-  =') === 0.5) + ' ' + '2 ^ 1 +/- = 0.5' + br;
test+=(TEST.setSequence('5 DEL pow =') === 1) + ' ' + '5 del ^ = 1' + br;
test+=(TEST.setSequence('AC pow =') === 1) + ' ' + '^ = 1' + br;
test+=(TEST.setSequence('0 pow 0 =') === 1) + ' ' + '0^0 = 1' + br;
test+=(TEST.setSequence('100 pow 2 root =') === 100) + ' ' + ' 100^2√ = 100' + br;
// let computation = 100000000000000.300000000002 - 100000000000000.200000000002;
let computation = 0.33 + 0.22;
// if(computation>100000000000000){
//     computation =( Math.round(computation*1000))/1000;
// }
// else{
    computation = (Math.round(computation*100000000000000))/100000000000000;
// }
test+=(computation);
console.log(test);
