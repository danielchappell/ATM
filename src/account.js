//ACCOUNT.JS//
//BANK ACCOUNT CONSTRUCTOR USED IN ATM.JS//
var Account = (function() {
      function Account(initDeposit, initPin, bank) {
        //PRIVATE DATA//
        var userPin, userBalance, accountLedger, setPin, changeBalance, updateLedger, bankID;
        userPin = initPin;
        userBalance = initDeposit;
        bankID = bank;
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
            difference = "+" + (newBalance - userBalance).toFixed(2);
          }
          else{
            return;
          }
          newEntry = [new Date(), transactionType, difference, newBalance];
          accountLedger.unshift(newEntry);
        };

        changeBalance = function(newBalance) {
          updateLedger(newBalance);
          userBalance = newBalance;
        };

        //PUBLIC METHODS//

        this.validate = function(pin, bank) {
          if (pin === userPin && bank === bankID) {
            return true;
          }
          return false;
        };

        this.setNewPin = function(pin, bank, newPin) {
          if ( this.validate(pin, bank) ) {
            setPin(newPin);
          }
          else {
            return "invalid credentials";
          }
        };

        this.retrieveBalance = function(pin, bank) {
          if ( this.validate(pin, bank) ) {
            return userBalance;
          }
          return "invalid credentials";
        };

        this.retrieveLedger = function(pin, bank) {
          if ( this.validate(pin, bank) ) {
            return accountLedger;
          }
          return "invalid credentials";
        };

        this.editBalance = function(pin, bank, newBalance) {
          if ( this.validate(pin, bank) ) {
            changeBalance(newBalance);
            return userBalance;
          }
          return "invalid credentials";
        };
      }
      return Account;
    })();

module.exports = Account;
