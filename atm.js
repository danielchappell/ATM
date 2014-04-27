var Account, prompt, promptSchemas, colors, ATM;
Account = require('./account.js');
promptSchemas = require('./prompt_schemas.js');
prompt = require('prompt');
colors = require('colors');

//ATM.JS//

ATM = (function() {
  function ATM() {
    //PRIVATE KEYS AND DATA//
    var bankID, session, sessionPin, defaultScreenCallback,userRegistrationCallback, transactionMenu,
      transactionMenuCallback, promptAnotherTransaction, anotherTransactionCallback, clearScreen;
    bankID = Math.floor(Math.random() * 1000000000000000).toString(10);
    //FORMATTING FOR PROMPTS//
    prompt.start();
    prompt.message = "";
    prompt.delimiter = " ";
    // ATM PROPERTIES//
    this.atmStatus = "ON"
    this.accounts = [];

    //PRIVATE METHODS//

    clearScreen = function() {
      process.stdout.write('\u001B[2J\u001B[0;0f');
    };


    //UI TERMINAL PROMPT METHODS//
    //PERHAPS TEMPORARY//
    defaultScreenCallback = function(err, choice) {
      clearScreen();
      if (err) {return}
      //IF RESULT IS 1 START LOGIN PROCCESS IF 2 START NEW USER REGISTRATION//
      if (choice["default screen"] === "1") {
        prompt.get( promptSchemas.loginSchema, this.startSession.bind(this) );
      }
      else{
        //START NEW USER REGISTRATION PROCCESS//
        prompt.get( promptSchemas.userRegistration, userRegistrationCallback.bind(this) );
      }
    };

    userRegistrationCallback = function(err, credentials) {
      //IF ERROR OR PIN AND VERIFICATION DON'T MATCH RE-PROMPT//
      clearScreen();
      if (err) {return}
      if ( credentials["secure pin"] !== credentials["verify pin"] ) {
        console.error("pin verification did not match");
        return prompt.get( promptSchemas.userRegistration, userRegistrationCallback.bind(this) );
      }
      var initDeposit = credentials["initial deposit"],
      initPin = credentials["secure pin"],
      accountNumber = this.newAccount(initDeposit, initPin);
      this.startSession( err, {"account number": accountNumber, "pin": initPin}, true );
    };

    promptAnotherTransaction = function(){
      console.log("\n\n\n\n");
      prompt.get( promptSchemas.anotherTransaction, anotherTransactionCallback.bind(this) );
    };

    anotherTransactionCallback = function(err, choice) {
      if (err) {return}
      if ( choice["another transaction?"] === "yes" || choice["another transaction?"] === "y" ) {
        transactionMenu.call(this);
      }
      else {
        //ENDS SESSION AND RESETS FOR NEXT USER//
        // console.log(this);
        this.endSession();
      }
    };

    transactionMenu = function() {
      clearScreen();
      console.log(promptSchemas["transactionMenu"]["properties"]["transaction menu"]["menu"])
      prompt.get( promptSchemas.transactionMenu, transactionMenuCallback.bind(this) );
    };



    transactionMenuCallback = function(err, choice) {
      if (err) {return}
      //SLIGHT DELAY AFTER TRANSACTION BEFORE PROMPTING FOR ANOTHER TRANSACTION//
      var promptTimeOut = setTimeout(promptAnotherTransaction.bind(this), 1500);
      console.log("\n\n")
      switch (choice["transaction menu"]) {
        case "1":
            //CHECK BALANCE//
            var balance = "your balance is:  $" + this.checkBalance();
            console.log(balance.blue);
            promptAnotherTransaction.call(this);
            clearTimeout(promptTimeOut);
          break;
        case "2":
          //PRINT ACCOUNT LEDGER//
          this.printLedger();
          promptAnotherTransaction.call(this);
          clearTimeout(promptTimeOut);
          break;
        case "3":
          //CHANGE PIN NUMBER//

          break;
        case "4":
          //WITHDRAW FUNDS//

          break;
        case "5":
          //DEPOSIT FUNDS//
      }

    };

    //PUBLIC && TESTABLE METHODS//

    //CREATES SECURE NEW BANK ACCOUNTS//
    this.newAccount = function(initDeposit, initPin) {
      var newAccount = new Account(initDeposit, initPin, bankID);
      this.accounts.push(newAccount);
      //USER ACCOUNTS START AT ARBITARY 6 DIGIT NUMBER//
      newAccount.accountNumber = this.accounts.length + 195341;
      return newAccount.accountNumber;
    };
    //STARTS AUTOMATION-WAITS FOR USER TO START SESSION//
    this.on = function() {
      clearScreen();
      session = null;
      sessionPin = null;
      prompt.get( promptSchemas.defaultSchema, defaultScreenCallback.bind(this) );
      this.atmStatus = "LISTENING";
    };
    //STARTS BANKING SESSION BY VERIFYING USER//
    this.startSession = function(err, credentials, newUser) {
      var accountNumber = credentials["account number"];
      //MAKE SURE ACCOUNT IS ON FILE//
      if ( this.accounts[accountNumber - 195342] instanceof Account) {
        var verified,
        pin = credentials["pin"];
        //RUN VALIDATION TO START SECURE SESSION//
        verified = this.accounts[accountNumber - 195342].validate(pin, bankID);
        if (verified) {
          session = this.accounts[accountNumber - 195342];
          sessionPin = pin;
          this.atmStatus = "IN SESSION";
          //NEWLY REGISTERED USERS ARE GIVEN THE OPTION TO LOG OUT//
          //PREVENTS AUTO LOADING TRANSACTION MENU//
          if (!newUser) {
            transactionMenu.call(this);
          }
          else{
            promptAnotherTransaction.call(this);
          }
          return "session started";
        }
        else {
          //CREDENTIALS FAILED WRONG ACCOUNT NUMBER OR PIN//
          console.error("bad credentials");
          return "invalid credentials";
        }
      }
      else {
        //ACCOUNT DOESN'T EXIST FOR THIS BANK//
        console.error("invalid account number");
        return "invalid account";
      }
    };

    this.checkBalance = function() {
      if (session) {
        //USES SESSION VARIABLES FOR SECURITY PURPOSES//
        var balance = session.retrieveBalance(sessionPin, bankID);
        return balance;
      }
      else {
        return "invalid session";
      }
    };

    this.printLedger = function() {
      if (session) {
        var unformattedLedger, formattedLedger,_i, _length, entryArray, date, string;
        unformattedLedger = session.retrieveLedger(sessionPin, bankID);
        formattedLedger = [];
        _length = unformattedLedger.length;
        if (_length > 0) {
          //LOOP THROUGH FORMAT AND PRINT EACH ENTRY//
          for ( _i = 0; _i < _length; _i++ ) {
            entryArray = unformattedLedger[_i];
            date = entryArray[0];
            string = date.toLocaleDateString() + " "  +
              date.toLocaleTimeString() + "    " +
              entryArray[1] + "    " + entryArray[2] +
              "  $" + entryArray[3].toFixed(2);
            formattedLedger.push(string);
            //PRINT EACH ENTRY TO THE SCREEN//
            console.log(string.blue);
          }
        }
        else {
          //PRINT A MESSAGE IF LEDGER IS EMPTY//
          console.log("no transactions yet!".blue);
        }
        return formattedLedger;
      }
      else{
        return "invalid session";
      }
    };

    this.withdrawFunds = function(amount) {
      if (session) {
        var newBalance,
        balance = this.checkBalance();
        if (balance > amount) {
          newBalance = balance - amount;
          balance = session.editBalance(sessionPin, bankID, newBalance);
          return balance;
        }
        else {
          //NOT ENOUGH FUNDS FOR WITHDRAWAL//
          return "insufficient funds";
        }
      }
      else {
        return "invalid session";
      }
    };

    this.depositFunds = function(amount) {
      if (session) {
        var newBalance,
        balance = this.checkBalance();
        newBalance = balance + amount;
        balance = session.editBalance(sessionPin, bankID, newBalance);
        return balance;
      }
      else {
        return "invalid session";
      }
    };

    this.endSession = function () {
      if (session) {
        session = null;
        sessionPin = null;
        this.on();
      }
    };

  }
  return ATM
})();

module.exports = ATM

//START PROGRAM//
newATM = new ATM();
newATM.on();