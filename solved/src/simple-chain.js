const CustomError = require("../extensions/custom-error");

const chainMaker = {
  chain : [],
  getLength() {
    return this.chain.length;
    throw new CustomError('Not implemented');
    // remove line with error and write your code here
  },
  addLink(value) {
    if(value===undefined){
      return this;
    }
    if(value==null){
      // console.log('null')
      value = 'null';
    }
    value = value.toString();
    if(typeof value !== 'string') {
      return this;
    }
    this.chain.push(value);
    return this;
    throw new CustomError('Not implemented');
    // remove line with error and write your code here
  },
  removeLink(position) {
    if(position <= 0 || typeof(position)!=='number' ){
      this.chain = [];
      throw new error();
    }
    (this.chain).splice(position-1,1);
    
    return this;
    throw new CustomError('Not implemented');
    // remove line with error and write your code here
  },
  reverseChain() {
    this.chain.reverse();
    return this;
    throw new CustomError('Not implemented');
    // remove line with error and write your code here
  },
  finishChain() {
    let chainData = '';
    let div = '';
    for(let i in this.chain){
        chainData += div + this.chain[i];
        div = ' )~~( ';
    }
    this.chain = [];
    return '( ' + chainData + ' )';
    throw new CustomError('Not implemented');
    // remove line with error and write your code here
  }
};

module.exports = chainMaker;
