const CustomError = require("../extensions/custom-error");

module.exports = class DepthCalculator {
  calculateDepth(arr) {
    let obj = this;
    let dpth = 0;
    let calculatedDepth = 0;
    for (let i in arr){
      if(Array.isArray(arr[i])){
        calculatedDepth = obj.calculateDepth(arr[i]);
        dpth = dpth < calculatedDepth ? calculatedDepth : dpth;
      }
    }
    return 1 + dpth;
  }
};