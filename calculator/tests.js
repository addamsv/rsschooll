

/**
*  
*   RSSCalculator Tests
*
*/




const TEST = new CalculatorAPI(true);

let test = '';
let br = "\n";

test += '/* INITIAL TESTS */' + br + br;

test += '/* Базовая функциональность */' + br;
test += (TEST.setSequence('1 + 2 =') === 3) + ' 1 + 2 = 3'+br;
test += (TEST.setSequence('23 + 69.5 =') === 92.5 ) + ' 23 + 69.5 =92.5' + br;
test += (TEST.setSequence('74 * 3 - 5 =') === 217) + ' 74 * 3 - 5 = 217' + br;
test += (TEST.setSequence('2 + 3 = 4 =') === 4) + ' 2 + 3 = 4 = 4 ' + 'после равно следующая цифра перезаписывает результат' + br;
test += (TEST.setSequence('5 AC') === 0) + ' AC - есть кнопка позволяющая очистить результат' + br;

test += br + '/* Дополнительные математические операции */' + br;
test += (TEST.setSequence('25 root') === 5) + ' 25 root = 5' + br;
test += (TEST.setSequence('AC root 25 =') === 5) +  ' AC root 25 = 5' + br;
test += (TEST.setSequence('9 root + 1 =') === 4) +  ' 9 root + 1 = 4' + br;
test += (TEST.setSequence('AC root 9 + 1 =') === 4) +  ' root 9 + 1 = 4' + br;
test += (TEST.setSequence('2 pow 2 =') === 4) +  ' 2 ^ 2 = 4' + br;
test += (TEST.setSequence('15 pow 3 =') === 3375) +  ' 15 ^ 3 = 3375' + br;
test += (TEST.setSequence('10.1 pow 3 =') === 1030.301) +  ' 10.1 ^ 3 = 1030.301' + br;

test += br + '/* Действия с отрицательными числами */' + br;
test += (TEST.setSequence('9 +/- / 3 +/- =') === 3) +  ' 9 ± / 3 ± = 3' + br;
test += (TEST.setSequence('2 + 2 +/- =') === 0) +  ' 2 + 2 ±= 0' + br;
test += (TEST.setSequence('2 / 2 +/- =') === -1) +  ' 2 / 2 ± = -1' + br;
test += (TEST.setSequence('9 +/- pow 3 =') === -729) +  ' 9 ± ^ 3 = -729' + br;
test += (TEST.setSequence('9 +/- root') === 'Error: Incorrect argument!') + ' 9 ±root -> Error: Incorrect argument!' + br;
test += (TEST.setSequence('AC root 9 +/- =') === 'Error: Incorrect argument!') + ' root 9 ± = ->Error: Incorrect argument!' + br;
test += (TEST.setSequence('AC root 9 +/- + 1 =') === 'Error: Incorrect argument!') + ' root 9 ±  + 1 = ->Error: Incorrect argument!' + br;

test += br + '/* Действия с дробями: */' + br;
test += (TEST.setSequence('0.1 + 0.2 =') === 0.3 )+  ' 0.1 + 0.2 = 0.3' + br;
test += (TEST.setSequence('0.4 - 0.1 =') === 0.3) +  ' 0.4 - 0.1 = 0.3' + br;
test += (TEST.setSequence('0.3 - 0.2 =') === 0.1) +  ' 0.3 - 0.2 = 0.1' + br;
test += (TEST.setSequence('0.0004 + 0.0004 =') === 0.0008 ) +  ' 0.0004 + 0.0004 = 0.0008' + br;
test += (TEST.setSequence('0.1 +/- * 0.2 =') === -0.02) +  ' 0.1 ± * 0.2 = -0.02' + br;
test += (TEST.setSequence('0.15 +/- + 0.15 +/- =') === -0.3) +  ' 0.15 ± + 0.15 ± = -0.3' + br;

test += br + '/* Big Digit Tests: */' + br;
// test += (TEST.setSequence('9999999999999999999999999999999999999999999999999999999999 + 1 =') === 'Error: Incorrect argument!') + ' 9999999999999999999999999999999999999999999999999999999999 + 1 = -> Error: Incorrect argument! You arent alowed to text such a big digit within RSSCalculatorAPI' + br;
test += (TEST.setSequence('99999999999999 * 99999999 =') === 99999998999990) + '  99999999999999 * 99999999 = 99999998999990' + br;
test += (TEST.setSequence('999999999999.3 - 0.2 =') === 999999999999.1) + '  99999999999999.3 - 0.2 = 99999999999999.1' + br;
test += (TEST.setSequence('10000000000000 + 1 =') === 1000000000001) + ' 10000000000000 + 1 = 10000000000001' + br;
test += (TEST.setSequence('10 pow 10000 =') === 'Infinity') + ' 10 ^ 10000 = Infinity' + br;
test += (TEST.setSequence('10 pow 100 =') === '1.0000000000000002e+100') + ' 10 ^ 100 = 1.0000000000000002e+100' + br;

test += br + '/* Crush Tests: */' + br;
test += (TEST.setSequence('9 / 0 =') === 'Error: Incorrect argument!') + ' 9 / 0 = Error: Incorrect argument!' + br;
test += (TEST.setSequence('0 / 2 =') === 0) + ' 0 / 2 = 0'+ br;
test += (TEST.setSequence('8 + - / * 2 =') === 16) + ' 8 + - / * 2 = 16' + br;
test += (TEST.setSequence('1 + = = = =') === 1) + ' 1 + = = = = 1 ' + br;
test += (TEST.setSequence('3 + 4 pow 2 = pow 2 =') === 361) + ' 3 + 4 ^ 2 = ^ 2 = 361' + br;
test += (TEST.setSequence('3 + 4 pow 2 = 19 pow 2 =') === 361 ) + ' 3 + 4 ^ 2 = 19 ^ 2 = 361 (Multiple degree ERROR Solved)' + br;
test += (TEST.setSequence('2 + 5 DEL root + 4 =') === 6) + ' ' + '2 + 5 del root + 4 = 6' + br;
test += (TEST.setSequence('AC root =') === 0 )+ ' ' + 'root = 0' + br;
test += (TEST.setSequence('2 pow 2 + 1 =') === 5) + ' ' + '2 ^ 2 + 1 = 5' + br;
test += (TEST.setSequence('2 pow 2 + 1 =') === 5) + ' ' + '2 ^ 2 + 1 = 5' + br;
test += (TEST.setSequence('9 * / del / + 1 =') === 10) + ' ' + '9 * / del / + 1 = 10' + 'сбрасывает пред операн' + br 
test += (TEST.setSequence('AC 9 root + 1 =') === 4) + ' ' + '√ 9 + 1 = 4' + br;
test += (TEST.setSequence('AC 2 pow 1 +/-  =') === 0.5) + ' ' + '2 ^ 1 ± = 0.5' + br;
test += (TEST.setSequence('5 DEL pow =') === 1) + ' ' + '5 del ^ = 1' + br;
test += (TEST.setSequence('AC pow =') === 1) + ' ' + '^ = 1' + br;
test += (TEST.setSequence('0 pow 0 =') === 1) + ' ' + '0^0 = 1' + br;
test += (TEST.setSequence('100 pow 2 root =') === 100) + ' ' + ' 100^2√ = 100 (сто возводим в квадрат и берем корень)' + br;
test += (TEST.setSequence('0.0000001 + 0.0000001 =') == 0.0000002) + ' ' + ' 0.0000001 + 0.0000001 = 2e-7 (=0 from demo)' + br;


console.log(test);
