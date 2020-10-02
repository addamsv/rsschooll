
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

    constructor() {
        this.makeContent();
    }

    /**
	* @private	Make Content Within "calculator-grid" css class
	* @return {void}
	*/
     makeContent(cssSelector='.calculator-grid'){
        const containers = document.querySelectorAll(cssSelector);
        console.log(containers[0]);
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
        this.operation;
        this.readyToReset;

        /**
         * Flags
         */
        this.isEqualsBtnWasClicked = false;
        this.isPowOperation = false;

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
        this.updateDisplay();
    }

    /**
	* @protected Remove last digit from the currentOperand
	* @return {void}
	*/
    delete() {
        if(this.isPowOperation){
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
        if(isNaN(current)){
            return;
        }
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
        let result = 0;
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
        result =  Math.sqrt(current, n);
        console.log('current: ' + result);
        this.currentOperandTextElement.innerText = this.makeSeparatedDigit(result);
        this.previousOperandTextElement.innerText = '√' + current + ' = ' + result;
        this.currentOperand = result;
        
    }

   /**
	* @protected Change Sign
	* @param  {String} number 
	* @return {void}
	*/
    appendNumber(number) {
        console.log('appendNumber');
        if(this.isEqualsBtnWasClicked){
            this.currentOperand = 0;//'';
            this.isEqualsBtnWasClicked = false;
        }
        if(number === '.' && this.currentOperand.toString().includes('.')){
            return;
        }
        if(this.isPowOperation){
            if (number === '.'){
                return;
            }
            this.powOperand = this.powOperand.toString() + number.toString();
            console.log('powOperand: ' + this.powOperand);
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
        // if(this.currentOperand === '' || this.currentOperand === '0'){
        //     return;
        // }
        if(this.previousOperand !== ''){
            this.compute();
        }
        console.log('choosenOperation: ' + operation);
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = 0;//'';
        this.previousOperandTextElement.innerText = (this.operation && this.previousOperand !== '') ? this.makeSeparatedDigit(this.previousOperand) + ' ' + this.operation : this.makeSeparatedDigit(this.previousOperand);
        this.currentOperandTextElement.innerText = '0';
    }

    /**
	* @protected Change Sign
	* @return {void}
	*/
    changeSign(){
        this.currentOperand *= -1;
        this.currentOperandTextElement.innerText = this.currentOperand;
        console.log('this.currentOperand: '+this.currentOperand);
    }
      
    /**
	* @protected Compute
	* @return {void}
	*/
    compute(){
        let computation;

        const prev = (parseFloat(this.previousOperand) ? parseFloat(this.previousOperand) : 0);

        let current = (parseFloat(this.currentOperand) ? parseFloat(this.currentOperand) : 0);

        console.log('isPowOperation: '+this.isPowOperation);
        if(!this.isPowOperation && (isNaN(prev) || isNaN(current))){
            console.log('Nan')
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
                if(current == 0){
                    this.currentOperandTextElement.innerText = 'Incorrect argument!';//alert('Incorrect argument!');
                    return;
                }
                computation = prev / current;
                break;
            case '+/-':
                computation = '-' + current;
                break;
        }

        this.previousOperandTextElement.innerText = (this.operation ? this.previousOperand + ' ' +  this.operation + ' '  : '') + this.currentOperand + (this.powOperand ? '^' + this.powOperand : '') + ' = ' + parseFloat(this.makeValidDigitString(computation));
        this.currentOperand = parseFloat(this.makeValidDigitString(computation));
        this.currentOperandTextElement.innerText = this.currentOperand;
        this.powOperand = '';
        this.previousOperand = 0;
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
        if(!this.isPowOperation){
            this.currentOperandTextElement.innerText = this.makeSeparatedDigit(this.currentOperand);
            return;
        }
        this.currentOperandTextElement.innerText = this.makeSeparatedDigit(this.currentOperand) + '^' + this.powOperand;
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

        console.log(window.navigator.userAgent.toLowerCase());


        
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






























// class CalculatorC extends CalculatorView {

//     constructor(cssSelector="[data-calc-btn]") {
//         super();

//         this.previousOperandTextElement = document.getElementById('previousOperand');
//         this.currentOperandTextElement = document.getElementById('currentOperand');
//         this.currentOperand = 2;
//         this.previousOperand = 4;
//         this.powOperand = '';
//         this.operation;
//         this.readyToReset;

//         /**
//          * Flags
//          */
//         this.isEqualsBtnWasClicked = false;
//         this.isPowOperation = false;

//         this.clear();

//         const buttons = document.querySelectorAll(cssSelector);
//         for (var i = 0, l = buttons.length; i < l; i++) {
//             this.buttonController(buttons[i]);
//         }
//     }

    


//     /**
//      * 
//      * 
//      * 
//      * 
//      *         CONTROLLER
//      * 
//      * 
//      * 
//      * 
//      * 
//      */

//     buttonController(btn){
//         let ob = this;
//         btn.onclick = buttonClickEvent;
//         btn.ontouchend = buttonClickEvent;

//         function buttonClickEvent(e) {
//             e = e || window.event;
//             e.preventDefault();

//             if(Number.isInteger(parseInt(btn.dataset.calcBtn)) || btn.dataset.calcBtn === '.'){
//                 ob.appendNumber(btn.dataset.calcBtn);
//                 ob.updateDisplay();
//             }
//             switch(btn.dataset.calcBtn){
//                 case '=':
//                     ob.compute();
//                     ob.isEqualsBtnWasClicked = true;
//                     break;
//                 case 'root':
//                     ob.sqrt();
//                     break;
//                 case 'pow':
//                     ob.pow();
//                     break;
//                 case '+':
//                 case '*':
//                 case '/':
//                 case '-':
//                     ob.standartOperation(btn.dataset.calcBtn);
//                     break;
//                 case 'AC':
//                     ob.clear();
//                     break;
//                 case 'DEL':
//                     ob.delete();
//                     break;
//                 case '+/-':
//                     ob.changeSign();
//                     break;
//             }
//         } 
//     }









//     /**
//      * 
//      * 
//      * 
//      *          MODEL
//      * 
//      * 
//      * 
//      */





//     clear(){
//         console.log('clear');
//         this.currentOperand = 0;
//         this.previousOperand = 0;
//         this.operation = undefined;
//         this.readyToReset = false;
//         this.isPowOperation = false;

//         this.updateDisplay();
//     }
    
//     delete() {
//         if(this.isPowOperation){
//             this.powOperand = this.powOperand.toString().slice(0, -1);
//         }
//         else {
//             this.currentOperand = this.currentOperand.toString().slice(0, -1);
//         }
//         this.updateDisplay();
//     }

//     pow(n = 2) {
//         let current = parseFloat(this.currentOperand);
//         if(isNaN(current)){
//             return;
//         }
//         if(!this.isPowOperation){
//             this.isPowOperation = true;
//             this.currentOperandTextElement.innerText = this.makeSeparatedDigit(this.currentOperand) + '^';
//             return;
//         }
//         return;
//     }

//     sqrt(n = 2) {
//         let current = parseFloat(this.currentOperand);
//         if(current < 0){
//             alert ('Incorrect argument!');
//             current = current * (-1);
//             this.currentOperand = current;
//             this.currentOperandTextElement.innerText = current;
//             return;
//         }
//         if(isNaN(current)){
//             return;
//         }
//         current =  Math.sqrt(current, n);
//         console.log('current: ' + current);
//         this.currentOperand = current;
        
//         this.currentOperandTextElement.innerText = this.makeSeparatedDigit(current);
//     }

//     appendNumber(number) {
//         console.log('appendNumber');
//         if(this.isEqualsBtnWasClicked){
//             this.currentOperand = '';
//             this.isEqualsBtnWasClicked = false;
//         }
//         if(number === '.' && this.currentOperand.includes('.')){
//             return;
//         }
//         if(this.isPowOperation){
//             if (number === '.'){
//                 return;
//             }
//             this.powOperand = this.powOperand.toString() + number.toString();
//             console.log('powOperand: ' + this.powOperand);
//             return;
//         }
//         this.currentOperand = this.makeValidDigitString(this.currentOperand.toString() + number.toString());
//     }

//     /**
// 	* @private Change Sign
// 	*
// 	* @return {void}
// 	*/
//     standartOperation(operation) {
//         // if(this.currentOperand === '' || this.currentOperand === '0'){
//         //     return;
//         // }
//         if(this.previousOperand !== ''){
//             this.compute();
//         }
//         console.log('choosenOperation: ' + operation);
//         this.operation = operation;
//         this.previousOperand = this.currentOperand;
//         this.currentOperand = '';
//         this.previousOperandTextElement.innerText = (this.operation && this.previousOperand !== '') ? this.makeSeparatedDigit(this.previousOperand) + ' ' + this.operation : this.makeSeparatedDigit(this.previousOperand);
//         this.currentOperandTextElement.innerText = '0';
//     }

//     /**
// 	* @private Change Sign
// 	*
// 	* @return {void}
// 	*/
//     changeSign(){
//         this.currentOperand *= -1;
//         this.currentOperandTextElement.innerText = this.currentOperand;
//         console.log('this.currentOperand: '+this.currentOperand);
//     }
      
//     /**
// 	* @private Compute
// 	*
// 	* @return {void}
// 	*/
//     compute(){
//         let computation;

//         const prev = (parseFloat(this.previousOperand) ? parseFloat(this.previousOperand) : 0);

//         let current = (parseFloat(this.currentOperand) ? parseFloat(this.currentOperand) : 0);

//         console.log('isPowOperation: '+this.isPowOperation);
//         if(!this.isPowOperation && (isNaN(prev) || isNaN(current))){
//             console.log('Nan')
//             return;
//         }
//         if(this.isPowOperation){
//             current = Math.pow(current, this.powOperand);
//             this.isPowOperation = false;
//             console.log('computation: ' + current);
//         }
//         if(!this.operation){
//             computation = current;
//         }
//         switch (this.operation) {
//             case '+':
//                 console.log('prev + current = ' + (prev + current));
//                 computation = prev + current;
//                 break;
//             case '-':
//                 computation = prev - current;
//                 break;
//             case '*':
//                 computation = prev * current;
//                 break;
//             case '/':
//                 if(current==0){
//                     alert('Incorrect argument!');
//                     return;
//                 }
//                 computation = prev / current;
//                 break;
//             case '+/-':
//                 computation = '-' + current;
//                 break;
//         }

//         this.previousOperandTextElement.innerText = this.previousOperand + ' ' + (this.operation ? this.operation : '') + ' ' + this.currentOperand + (this.powOperand ? '^' + this.powOperand : '') + ' = ' + parseFloat(this.makeValidDigitString(computation));
//         this.currentOperand = parseFloat(this.makeValidDigitString(computation));
//         this.currentOperandTextElement.innerText = this.currentOperand;
//         this.powOperand = '';
//         this.previousOperand = 0;
//     }
    
//     /**
// 	* @private	Display the Current and Previouse digit on the screen
// 	*
// 	* @return {void}
// 	*/ 
//     updateDisplay(){
//         this.displayCurrent();
//         this.displayPrev();
//     }
       
//     /**
// 	* @private	Display the Current digit on the screen
// 	*
// 	* @return {void}
// 	*/ 
//     displayCurrent(){
//         if(!this.isPowOperation){
//             this.currentOperandTextElement.innerText = this.makeSeparatedDigit(this.currentOperand);
//             return;
//         }
//         this.currentOperandTextElement.innerText = this.makeSeparatedDigit(this.currentOperand) + '^' + this.powOperand;
//     }
    
//     /**
// 	* @private	Display the Previouse digit on the screen
// 	*
// 	* @return {void}
// 	*/
//     displayPrev(){
//         this.previousOperandTextElement.innerText = (this.operation && this.previousOperand != '') ? this.makeSeparatedDigit(this.previousOperand) + ' ' + this.operation : this.makeSeparatedDigit(this.previousOperand);
//     }
    
//     /**
// 	* @private	Retrieve a comma/dot separated digit to display on the screen
// 	*
// 	* @param  {Number} num - digit 
// 	* @return {String} digit
// 	*/
//     makeSeparatedDigit(num){
//         let decimal = this.getIntegerDigitString(num);
//         return this.getNumSign(num) + decimal.toLocaleString('en', { maximumFractionDigits: 0 }) + this.getDecimalDigitString(num);
//     }
    
//     /**
// 	* @private	Retrieve a validated digit
// 	*
// 	* @param  {Number} num - digit 
// 	* @return {String} digit
// 	*/
//     makeValidDigitString(num){
//         console.log('makeValidDigitString:' + num + ' return: ' +this.getNumSign(num) + this.getIntegerDigitString(num) + this.getDecimalDigitString(num));
//         return this.getNumSign(num) + this.getIntegerDigitString(num) + this.getDecimalDigitString(num);  
//     }
    
//     /**
// 	* @private	Retrieve a negative or positive(nothing) symbol
// 	*
// 	* @param  {Number} num - a integer part of a digit
// 	* @return {String} sign
// 	*/
//     getNumSign(num){
//         return (num.toString().substr(0,1) === '-') ? '-' : '';
//     }
    
//     /**
// 	* @private	Retrieve a integer part of the Digit
// 	*
// 	* @param  {Number} num - a integer part of a digit
// 	* @return {Number} not more than 14 simbols
// 	*/
//     getIntegerDigitString(num){
//         console.log('num: ' + num + 'getIntegerDigitString: ' + num.toString().split('.')[0]);
//         return this.getValidIntegerDigitString(num.toString().split('.')[0]);
//     }
    
//     /**
// 	* @private	Validation of the integer part of the Digit
// 	*
// 	* @param  {String} stringNumber - a integer part of a digit
// 	* @return {Number} not more than 14 simbols
// 	*/
//     getValidIntegerDigitString(stringNumber){
//         let val = (stringNumber && stringNumber.length >= 15) ? stringNumber.substr(0, 14) : stringNumber;
//         val = parseInt(val);
//         return (isNaN(val)) ? 0 : Math.abs(val);
//     }
    
//     /**
// 	* @private	Retrieve a decimal part of the Digit
// 	*
// 	* @param  {Number} num - a decimal part of a digit
// 	* @return {String} not more than 14 simbols
// 	*/
//     getDecimalDigitString(num){
//         //let outData = 
//         console.log('num:' +num+ '   Decimal ' +num.toString().split('.')[1])
//         return this.getValidDecimalDigitString(num.toString().split('.')[1]);//outData === '' ? '' : '.' + outData;
//     }
    
//     /**
// 	* @private	Validation of the decimal part of the Digit
// 	*
// 	* @param  {String} stringNumber - a decimal part of a digit
// 	* @return {String} not more than 14 simbols
// 	*/
//     getValidDecimalDigitString(stringNumber){
//         if(stringNumber === undefined){
//             return '';
//         }
//         return (stringNumber.length >= 15) ? '.' + stringNumber.substr(0, 14) : '.' + stringNumber;
//     }

// }
