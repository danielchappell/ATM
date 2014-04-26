var Account, ATM;
Account = require('./account.js');

//ATM.JS//

ATM = (function() {
  function ATM() {
    //PRIVATE BANK KEY//
    var bankID = Math.floor(Math.random() * 1000000000000000)
    // ATM PROPERTIES//
    this.accounts = [];
    //CREATES SECURE NEW BANK ACCOUNTS//
    this.newAccount = function(initDeposit, initPin) {
      var newAccount = new Account(initDeposit, initPin);
      this.accounts.push(newAccount);
      newAccount.accountNumber = this.accounts.length;
      return newAccount.accountNumber;
    };
  }
  return ATM
})();

module.exports = ATM