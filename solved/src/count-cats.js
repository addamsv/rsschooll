const CustomError = require("../extensions/custom-error");

module.exports = function countCats(a) {/* matrix */
  let count = 0;
  for (let i = 0, l = a.length; i < l; i++){
    for (let j = 0, lInner = a[i].length; j < lInner; j++){
       if (a[i][j] === '^^'){
        count = count + 1;
       }
    }
  }
  return count;
  throw new CustomError('Not implemented');
  // remove line with error and write your code here
};
