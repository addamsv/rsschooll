const CustomError = require("../extensions/custom-error");

class VigenereCipheringMachine {

	constructor(_forwardWay=true) {
    this.forwardWay = _forwardWay;
    this.alphabet = this.getAlphabet();
    this.table = this.getTable();
  }

  encrypt(message, key) {
    this.validateParams(message,key);
    let cryptStr = '';
    message = message.toUpperCase();
    key = key.toUpperCase();
    for (let i = 0,j = 0; i < message.length; i++, j++) {
      if(this.isSymbNooootExstInAlphabet(key[i])){
        key += key;
      }
      if(this.isSymbNooootExstInAlphabet(message[i])){
        cryptStr += message[i];
        j--;
        continue;
      }
      /* getingNextSymba - table[ind1][ind2] */
      cryptStr += this.table[this.alphabet.indexOf(message[i])][this.alphabet.indexOf(key[j])];
    }
    return this.getFinishData(cryptStr);;
  }

  decrypt(message, key) {
    this.validateParams(message,key);
    let decryptStr = '';
    key = key.toUpperCase();
    for (let i = 0,j = 0; i < message.length; i++, j++) {
      if(this.isSymbNooootExstInAlphabet(key[i])){
        key += key;
      }
      if(this.isSymbNooootExstInAlphabet(message[i])){
        decryptStr += message[i];
        j--;
        continue;
      }
      decryptStr += this.getSymbaFromAlphabet(message[i],key[j]);
    }
    return this.getFinishData(decryptStr);
  }
  
  
  /* Private area */

  getTable() {
    let table = [];
    for (var i = 0; i < this.alphabet.length; i++) {
        table[i] = this.alphabet.slice(i).concat(this.alphabet.slice(0, i));
    }
    return table;
  }

  getAlphabet(a='eng') {
    return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  }
  
  isSymbNooootExstInAlphabet(symba){
    return this.alphabet.indexOf(symba) === -1;
  }

  getFinishData(str){
    return (!this.forwardWay) ? str.split('').reverse().join('') : str;
  }

  getSymbaFromAlphabet(i,j){
    return this.alphabet[this.getSybaPosFromTable(i, j)];
  }

  getSybaPosFromTable(messagePos, keyPos){
    return this.table[this.getRow(keyPos)].indexOf(messagePos);
  }
  getRow(keyPos){
    return this.alphabet.indexOf(keyPos);
  }
  validateParams(m,k){
    if(m===undefined || k===undefined){
      throw new error();
    }  
  }
}

module.exports = VigenereCipheringMachine;
