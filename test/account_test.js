var chai = require('chai'),
Account = require('../account.js'),
expect = chai.expect;


//TESTS FOR ACCOUNT.JS//
describe("Account", function() {
  //CREATE NEW INSTANCE FOR EACH TEST//
  var user = new Account(2000, '4385');
  describe("constructor", function() {
    it("should initialize", function() {
      expect(user.constructor.name).to.equal("Account");
    });
    it("should accept initial deposit and pin", function() {
      expect(Account).to.have.length(2);
    });
  });
  describe("retrieveBalance", function() {
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