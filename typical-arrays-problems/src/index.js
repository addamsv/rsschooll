
exports.min = function min (array) {
  return (!array || array.length == 0)   ?   0   :   Math.min(...array);
    // if(!array || array.length == 0){
    //   return 0;
    // }
}

exports.max = function max (array){
  return  (!array || array.length == 0)   ?   0   :    Math.max(...array);
    // if(!array || array.length == 0){
    //   return 0;
    // }
}

exports.avg = function avg (array) {
  return  (!array || array.length == 0)   ?   0   :   (array.reduce((a, b) => a + b, 0)) / array.length;
    // if(!array || array.length == 0){
    //   return 0;
    // }

  // const total = array.reduce((a, b) => a + b, 0);
  // return total/array.length;

  //const l = array.length;
  // for (let i = 0; i < l; i++){
  //   total = total + array[i];
  // }
}
