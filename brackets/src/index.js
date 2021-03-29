module.exports = function check(str, bracketsConfig) {
  let 
    openned = [];
  str = str.split('');
  if(str.length%2 !== 0){
    return false;
  }
  for(let i=0, l=str.length; i<l; i++){
    for(let j=0,lj=bracketsConfig.length; j<lj; j++){
      if(openned.length > 0 && str[i] === bracketsConfig[j][1] && openned[openned.length-1] === bracketsConfig[j][0]) {
        openned.pop();
      }
      else if(str[i] === bracketsConfig[j][0]){
        openned.push(str[i]);
      }
    }
  }
  return openned.length ? false : true;
}
