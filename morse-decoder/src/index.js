const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

function decode(expr) {
  //10 .  11 -  wodrd.length==10, sentence gap is **********
  var 
    encodedStr = [],
    str = '';
  expr.split("**********").map(function(a){
    a = a.match(/.{1,10}/g);
    a.map(function(b){
      b = b.match(/.{1,2}/g);
      b.map(function(c){
        switch(c){
          case '10':
            str += '.';
            break;
          case '11':
            str += '-';
            break;
        }
      });
      str += ' ';
    });
    str += '  ';
  });
  str.split('  ').map(function(word) {
      word.split(' ').map(function (letter) {
          encodedStr.push(MORSE_TABLE[letter]);
      });
      encodedStr.push(' ');
  });
  return encodedStr.join('').slice(0,-2);
}

module.exports = {
    decode
}