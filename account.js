//ACCOUNT.JS//
//BANK ACCOUNT CONSTRUCTOR USED IN ATM.JS//
var Account = (function() {
      function Account(initDeposit, initPin) {
        //PRIVATE PIN AND BALANCE//
        var userPin, userBalance;
        userPin = initPin;
        userBalance = initDeposit;
      }
      return Account;
    })();

module.exports = Account;