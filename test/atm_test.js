var chai = require('chai'),
ATM = require('../atm.js'),
expect = chai.expect;
chai.should()


//TESTS FOR ATM.JS//

describe("ATM", function() {
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
  describe("newAccount", function() {
    var atm = new ATM();
    it("should be able to create new account", function() {
      var userNum, user;
      userNum = atm.newAccount(5000, '4242');
      user = atm.accounts[userNum - 1];
      expect(user.constructor.name).to.equal("Account");
      expect(atm.accounts.length).to.equal(1);
    });
  });
});