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
});