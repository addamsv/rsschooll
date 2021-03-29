const CustomError = require("../extensions/custom-error");

module.exports = function repeater(str, options ){
	if(options.addition===null){
		options.addition='null';
  }
	if(options.addition===false){
		options.addition='false';
  }
	opt = { 
    repeatTimes: options.repeatTimes ? options.repeatTimes : 1,
    separator: options.separator ? options.separator : '+',
    addition: options.addition ? (options.addition).toString() : '',
    additionRepeatTimes: options.additionRepeatTimes ? options.additionRepeatTimes : 1,
    additionSeparator: options.additionSeparator ? options.additionSeparator : ''
  }
  let adshnl = (opt.addition + opt.additionSeparator).repeat(opt.additionRepeatTimes);
	adshnl = (opt.additionSeparator).length > 0 ? adshnl.slice(0, -((opt.additionSeparator).length)) : adshnl;
	let outStr = ( (str === null ? 'null' : str.toString() ) + adshnl + opt.separator).repeat(opt.repeatTimes);
	outStr = outStr.slice(0, -((opt.separator).length));
  return outStr;
};
  