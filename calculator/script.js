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

        let ob = this; 
        btn.onmousedown = buttonClickEvent;
        btn.ontouchstart = buttonClickEvent;

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
                    ob.updateDisplay();
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
            document.onmouseup = buttonClickEventEnd;
            document.ontouchend = buttonClickEventEnd;
        }
        function buttonClickEventEnd() {
            document.onmouseup = null;
            document.ontouchend = null;
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
    }
    
    delete() {
        console.log('delete');
    }

    summ(){
    }

    appendNumber(number) {
        console.log('appendNumber');
    }

    chooseOperation(operation) {
        console.log('chooseOperation');
    }

    compute(){
        console.log('compute');
    }

    updateDisplay(){
        console.log('updateDisplay');
    }

}

new Calculator();
