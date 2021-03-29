const CustomError = require("../extensions/custom-error");

module.exports = function createDreamTeam( members ) {
  if(!members){
    return false;
  }
	let team = '';
	for (let i = 0, l = members.length; i < l; i++){
		team += (typeof(members[i]) === 'string') ? members[i].replace(/ /g,'').slice(0, 1).toUpperCase() : '';
	}
	return team.split('').sort().join('');
  //throw new CustomError('Not implemented');
  // remove line with error and write your code here
};
