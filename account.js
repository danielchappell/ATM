//ACCOUNT.JS//
//BANK ACCOUNT CONSTRUCTOR USED IN ATM.JS//
var Account = (function() {
      function Account(initDeposit, initPin) {
        //PRIVATE PIN AND BALANCE//
        var userPin, userBalance, setPin;
        userPin = initPin;
        userBalance = initDeposit;

        //PRIVATE METHODS//
        setPin = function(newPin) {
          userPin = newPin;
        };

        //PUBLIC METHODS//

        this.validatePin = function(pin) {
          if (pin === userPin) {
            return true;
          }
          else {
            return false;
          }
        };

        this.setNewPin = function(pin, newPin) {
          if ( this.validatePin(pin) ) {
            setPin(newPin);
          }
          else {
            return "INVALID PIN";
          }
        };

        this.retrieveBalance = function(pin) {
          if ( this.validate(pin) ) {
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