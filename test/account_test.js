var chai = require('chai'),
Account = require('../account.js'),
expect = chai.expect;


//TESTS FOR ACCOUNT.JS//
describe("Account", function() {
  //CREATE NEW INSTANCE FOR EACH TEST//
  var user = new Account(2000, 4385);
  describe("constructor", function() {
    it("should initialize", function() {
      expect(user.constructor.name).to.equal("Account");
    });
    it("should accept initial deposit and pin", function() {
      expect(Account).to.have.length(2);
    });
  });
});