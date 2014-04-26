//ACCOUNT.JS//
//BANK ACCOUNT CONSTRUCTOR USED IN ATM.JS//
var Account = (function() {
      function Account(initDeposit, initPin) {
        //PRIVATE DATA//
        var userPin, userBalance, accountLedger, setPin, changeBalance, updateLedger;
        userPin = initPin;
        userBalance = initDeposit;
        accountLedger = [];

        //PRIVATE METHODS//
        setPin = function(newPin) {
          userPin = newPin;
        };

        updateLedger = function(newBalance){
          var newEntry, transactionType, difference;
          if (userBalance > newBalance) {
            transactionType = "Debit";
            difference = "-" + (userBalance - newBalance);
          }
          else if (userBalance < newBalance) {
            transactionType = "Credit";
            difference = "+" + (newBalance - userBalance);
          }
          else{
            return
          }
          newEntry = [new Date(), transactionType, difference, newBalance];
          accountLedger.push(newEntry);
        }

        changeBalance = function(newBalance) {
          updateLedger(newBalance);
          userBalance = newBalance;
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
          if ( this.validatePin(pin) ) {
            return userBalance;
          }
          else {
            return "INVALID PIN";
          }
        };

        this.retrieveLedger = function(pin) {
          if ( this.validatePin(pin) ) {
            return accountLedger;
          }
          else {
            return "INVALID PIN";
          }
        };

        this.editBalance = function(pin, newBalance) {
          if ( this.validatePin(pin) ) {
            changeBalance(newBalance);
            return userBalance;
          }
          else{
            return "INVALID PIN"
          }
        };
      }
      return Account;
    })();

module.exports = Account;