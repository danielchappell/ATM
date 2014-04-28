var chai = require('chai'),
sinon = require('sinon'),
prompt = require('prompt'),
ATM = require('../src/atm.js'),
expect = chai.expect;


//TESTS FOR ATM.JS//

describe("ATM", function() {
  //PREVENT MEMORY LEAK IN TESTS CAUSED BY PROMPT BUILD UP WITH OUT RESPONSE//
  //NOT AN ISSUE IN APPLICATION//
  var stub = sinon.stub(prompt);

  describe('constructor', function() {
    var atm = new ATM();
    it("should initialize", function() {
      expect(atm.constructor.name).to.equal("ATM");
    });
    it('should have accounts property', function() {
      var isArray = Array.isArray(atm.accounts);
      expect(atm).to.have.property("accounts")
      expect(isArray).to.equal(true);
    });
  });
  describe("on", function(){
    var atm = new ATM();
    it("should listen for user to start session", function() {
      expect(atm.atmStatus).to.equal("ON");
      atm.on();
      expect(atm.atmStatus).to.equal("LISTENING");
    });
  });
  describe("startSession", function() {
    var inSession,
    atm = new ATM(),
    userNum = atm.newAccount(5000, '4242'),
    credentials = {"account number": userNum, "pin": "4242"};
    it("should be able to start new bank session", function () {
      inSession = atm.startSession(null, credentials);
      expect(inSession).to.equal("session started");
    });
    it("should validate user", function() {
      var credentials = {"account number": userNum, "pin": "5000"};
      inSession = atm.startSession(null, credentials);
      expect(inSession).to.equal("invalid credentials")
    });
  });
  describe("newAccount", function() {
    var atm = new ATM();
    it("should be able to create new account", function() {
      var userNum, user;
      userNum = atm.newAccount(5000, '4242');
      user = atm.accounts[userNum - 195342];
      expect(user.constructor.name).to.equal("Account");
      expect(atm.accounts.length).to.equal(1);
    });
  });
  describe("checkBalance", function() {
    var atm = new ATM(),
    userNum = atm.newAccount(5000, '4242'),
    credentials = {"account number": userNum, "pin": "4242"};
    atm.startSession(null, credentials);
    it("should be able to retrieve user's balance", function() {
      var balance = atm.checkBalance();
      expect(balance).to.equal(5000);
    });
  });
  describe("withdrawFunds", function() {
    var atm = new ATM();
    userNum = atm.newAccount(5000, '4242'),
    credentials = {"account number": userNum, "pin": "4242"};
    atm.startSession(null, credentials);
    it("should be able to withdraw from user account", function() {
      var balance = atm.checkBalance();
      expect(balance).to.equal(5000);
      balance = atm.withdrawFunds(500);
      expect(balance).to.equal(4500);
    });
    it("should not be able to withdraw more than current balance", function() {
      var error = atm.withdrawFunds(6000);
      expect(error).to.equal("insufficient funds");
    });
  });
  describe("depositFunds", function() {
    var atm = new ATM();
    userNum = atm.newAccount(5000, '4242'),
    credentials = {"account number": userNum, "pin": "4242"};
    atm.startSession(null, credentials);
    it("should be able to deposit funds", function() {
      balance = atm.checkBalance();
      expect(balance).to.equal(5000);
      balance = atm.depositFunds(1000);
      expect(balance).to.equal(6000);
    });
  });
  describe("printLedger", function() {
    //STUB DATE//
    var fakeDate = new Date("Saturday, April 26, 2014 23:52:40").getTime(),
    clock = sinon.useFakeTimers(fakeDate),
    atm = new ATM(),
    userNum = atm.newAccount(5000, '4242'),
    credentials = {"account number": userNum, "pin": "4242"};
    atm.startSession(null, credentials);
    it("should correctly formated account ledger", function(){
      var ledger, expectation;
      atm.depositFunds(500);
      atm.withdrawFunds(2000);
      ledger = atm.printLedger();
      expectation = [
        "Saturday, April 26, 2014 23:52:40    Debit    -2000  $3500.00",
        "Saturday, April 26, 2014 23:52:40    Credit    +500.00  $5500.00"
      ];
      //EXPECT EACH ENTRY TO MATCH//
      for ( var _i = 0, _length = ledger.length; _i < _length; _i++ ) {
        expect(ledger[_i]).to.equal(expectation[_i]);
      }
      //RESTORE DATE//
      clock.restore();
    });
  });
  describe("changePin", function() {
    var success,
    atm = new ATM(),
    userNum = atm.newAccount(5000, '4242'),
    credentials = {"account number": userNum, "pin": "4242"};
    prompt.logger.setMaxListeners(20);
    atm.startSession(null, credentials);

    it("should be able to change pin", function() {
      success = atm.changePin("9933");
      expect(success).to.equal(true);
    });
    it("cannot change the pin if session isn't authenticated", function() {
      atm.endSession();
      success = atm.changePin("2244");
      expect(success).to.equal("invalid session");
    });
  });
  describe("endSession", function() {
    var atm = new ATM();
    userNum = atm.newAccount(5000, '4242'),
    credentials = {"account number": userNum, "pin": "4242"};
    prompt.logger.setMaxListeners(20);
    atm.startSession(null, credentials);
    it("should be able to end a user session", function() {
      //CAN PERFORM TRANSACTIONS WHILE AUTHENTICATED//
      balance = atm.checkBalance();
      expect(balance).to.equal(5000);
      //OUT OF SESSION TRANSACTIONS RESULT IN ERRORS//
      atm.endSession();
      error = atm.checkBalance();
      expect(error).to.equal("invalid session");
    });
  });
});