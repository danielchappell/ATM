//ACCOUNT.JS//
//BANK ACCOUNT CONSTRUCTOR USED IN ATM.JS//
var Account = (function() {
      function Account(initDeposit, initPin) {
        //PRIVATE PIN AND BALANCE//
        var userPin, userBalance, setPin;
        userPin = initPin;
        userBalance = initDeposit;

        this.validatePin = function(pin) {
          if (pin === userPin) {
            return true;
          }
          else {
            return false;
          }
        };

        this.retrieveBalance = function(pin) {
          if (pin === userPin) {
            return userBalance;
          }
          else {
            return "INVALID PIN";
          }
        };
      }
      return Account;
    })();

module.exports = Account;