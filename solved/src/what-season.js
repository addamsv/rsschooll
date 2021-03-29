const CustomError = require("../extensions/custom-error");

module.exports = function getSeason(date) {
  if(date===undefined){
    return 'Unable to determine the time of year!';
    throw new error();
  }
  if(Object.prototype.toString.call(date) !== '[object Date]'){
    throw new error();
  }
  switch(date.getMonth()+1) {
    case 12:
    case 1:
    case 2:
        return 'winter';
    break;
    case 3:
    case 4:
    case 5:
        return 'spring';
    break;
    case 6:
    case 7:
    case 8:
        return 'summer';
    break;
    case 9:
    case 10:
    case 11:
        return 'autumn';
    break;
  }
};
