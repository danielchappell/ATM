var chai = require('chai'),
Account = require('../src/account.js'),
expect = chai.expect;


//TESTS FOR ACCOUNT.JS//
describe("Account", function() {
  var bankID = '12345678912345'
  describe("constructor", function() {
    var user = new Account(2000, '4385', bankID);
    it("should initialize", function() {
      expect(user.constructor.name).to.equal("Account");
    });
    it("should accept initial deposit,pin bankID", function() {
      expect(Account).to.have.length(3);
    });
  });
  describe("validate", function() {
    var user = new Account(2000, '4385', bankID);
    it("should accurately validate provided pin", function() {
      var valid = user.validate("5000", bankID);
      expect(valid).to.equal(false);
      valid = user.validate("4385", bankID);
      expect(valid).to.equal(true);
    });
  });
  describe("setNewPin", function() {
    var user = new Account(2000, '4385', bankID);
    it("should be able to change pin", function() {
      var newPin = '5555',
      valid = user.validate(newPin, bankID);
      //USE WRONG PIN EXPECT VALIDATION TO FAIL//
      expect(valid).to.equal(false);
      //SET NEW PIN USING CURRENT PIN//
      user.setNewPin('4385', bankID, newPin);
      // EXPECT NEW PIN TO NOW VALIDATE//
      valid = user.validate(newPin, bankID);
      expect(valid).to.equal(true);
    });
  });
  describe("retrieveBalance", function() {
    var user = new Account(2000, '4385', bankID);
    it("should be able to retrieve current Balance", function() {
      var balance = user.retrieveBalance('4385', bankID);
      expect(balance).to.equal(2000);
    });
    it("should log error if pin is invalid", function() {
      var balance = user.retrieveBalance('5000', bankID);
      expect(balance).to.equal('invalid credentials');
    });
  });
  describe("retrieveLedger", function() {
    var user = new Account(2000, '4385', bankID);
    it("should be able to retrieve account ledger", function() {
      var isArray,
      ledger = user.retrieveLedger('4385', bankID);
      isArray = Array.isArray(ledger);
      expect(isArray).to.equal(true);
    });
  });
  describe("editBalance", function() {
    it("should be able to change user's balance", function() {
      //CONFIRM EXPECTED BALANCE//
      var user = new Account(2000, '4385', bankID),
      balance = user.retrieveBalance('4385', bankID);
      expect(balance).to.equal(2000);
      //CHANGE BALANCE AND RERUN ASSERTION//
      user.editBalance('4385', bankID, 5000);
      balance = user.retrieveBalance('4385', bankID);
      expect(balance).to.equal(5000);
    });
    it("should update the account ledger", function() {
      var ledgerLength,
      user = new Account(2000, '4385', bankID);
      //CONFIRM LEDGER LENGTH IS 0//
      ledgerLength = user.retrieveLedger('4385', bankID).length;
      expect(ledgerLength).to.equal(0);
      //EDIT BALANCE AND RECHECK LEDGER LENGTH//
      user.editBalance('4385', bankID, 500);
      ledgerLength = user.retrieveLedger('4385', bankID).length;
      expect(ledgerLength).to.equal(1);
    });
  });
});