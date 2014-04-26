var chai = require('chai'),
Account = require('../account.js'),
expect = chai.expect;


//TESTS FOR ACCOUNT.JS//
describe("Account", function() {
  describe("constructor", function() {
    var user = new Account(2000, '4385');
    it("should initialize", function() {
      expect(user.constructor.name).to.equal("Account");
    });
    it("should accept initial deposit and pin", function() {
      expect(Account).to.have.length(2);
    });
  });
  describe("validatePin", function() {
    var user = new Account(2000, '4385');
    it("should accurately validate provided pin", function() {
      var valid = user.validatePin("5000");
      expect(valid).to.equal(false);
      valid = user.validatePin("4385");
      expect(valid).to.equal(true);
    });
  });
  describe("setNewPin", function() {
    var user = new Account(2000, '4385');
    it("should be able to change pin", function() {
      var newPin = '5555',
      valid = user.validatePin(newPin);
      //USE WRONG PIN EXPECT VALIDATION TO FAIL//
      expect(valid).to.equal(false);
      //SET NEW PIN USING CURRENT PIN//
      user.setNewPin('4385', newPin);
      // EXPECT NEW PIN TO NOW VALIDATE//
      valid = user.validatePin(newPin);
      expect(valid).to.equal(true);
    });
  });
  describe("retrieveBalance", function() {
    var user = new Account(2000, '4385');
    it("should be able to retrieve current Balance", function() {
      var balance = user.retrieveBalance('4385');
      expect(balance).to.equal(2000);
    });
    it("should log error if pin is invalid", function() {
      var balance = user.retrieveBalance('5000');
      expect(balance).to.equal('INVALID PIN');
    });
  });
  describe("retrieveLedger", function() {
    var user = new Account(2000, '4385');
    it("should be able to retrieve account ledger", function() {
      var isArray,
      ledger = user.retrieveLedger('4385');
      isArray = Array.isArray(ledger);
      expect(isArray).to.equal(true);
    });
  });
  describe("editBalance", function() {
    it("should be able to change user's balance", function() {
      //CONFIRM EXPECTED BALANCE//
      var user = new Account(2000, '4385'),
      balance = user.retrieveBalance('4385');
      expect(balance).to.equal(2000);
      //CHANGE BALANCE AND RERUN ASSERTION//
      user.editBalance('4385', 5000);
      balance = user.retrieveBalance('4385');
      expect(balance).to.equal(5000);
    });
    it("should update the account ledger", function() {
      var ledgerLength,
      user = new Account(2000, '4385');
      //CONFIRM LEDGER LENGTH IS 0//
      ledgerLength = user.retrieveLedger('4385').length;
      expect(ledgerLength).to.equal(0);
      //EDIT BALANCE AND RECHECK LEDGER LENGTH//
      user.editBalance('4385', 500);
      ledgerLength = user.retrieveLedger('4385').length;
      expect(ledgerLength).to.equal(1);
    });
  });
});