const CustomError = require("../extensions/custom-error");

module.exports = function calculateHanoi(disksNumber, turnsSpeedHr) {
    /*   
    With 3 disks, the puzzle can be solved in 7 moves. 
    The minimal number of moves required to solve 
    a Tower of Hanoi puzzle is 2^n − 1,
    where n is the number of disks.
    */
   let turnAmount = Math.pow(2,disksNumber)-1;
   return {turns: turnAmount, seconds: Math.floor(turnAmount*3600/turnsSpeedHr)};
};
