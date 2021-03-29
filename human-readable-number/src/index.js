module.exports = function toReadable (number) {
    const firstNumArr = ['zero','one','two','three','four','five','six','seven','eight','nine']
    const secndNumArr = ['ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen']; //+'teen'
    const decNumArr = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];   
    const reallyNumArr = ['hundred'];//, 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion'   
    const digitStr = number.toString();
 
    switch(digitStr.length) {
        case 1: 
            return firstNumArr[number];
        /* dec */
        case 2:
          return getDec(number);
        /* hundrd */
        case 3:
          const h = firstNumArr[Number(digitStr.slice(0,1))] + ' ' + reallyNumArr[0];
          if (number%100 === 0) {
            return  h;
          }
          const secDec = Number(digitStr.slice(1,3));
          return h + ' ' + ((secDec < 10) ? firstNumArr[secDec] : getDec(secDec));
     }
    function getDec(dec){
      if (dec > 9 && dec < 20) {
          return secndNumArr[dec-10];
      }
      const firstDigit = decNumArr[Number(dec.toString().slice(0,1)) - 2];
      const secondDigit = firstNumArr[Number(dec.toString().slice(1,2))];
      return (dec%10 === 0) ? firstDigit : firstDigit + ' ' + secondDigit;
    }
}
