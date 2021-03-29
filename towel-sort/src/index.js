
// You should implement your task here.

module.exports = function towelSort (matrix) {
  if(matrix===undefined){
    return [];
  }
  if(matrix.length===0){
    return [];
  }
  let arr = [];
  for(let i=0, l=matrix.length; i<l; i++){
    if(i%2 !== 0){
      matrix[i].sort((a, b) => b - a);
    }
    arr.push(...matrix[i]);
  }
  return arr;
}
