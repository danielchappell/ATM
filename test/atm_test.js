var chai = require('chai'),
ATM = require('../atm.js'),
expect = chai.expect;
chai.should()


//TESTS FOR ATM.JS//

describe("ATM", function() {
  //CREATE NEW INSTANCE FOR EACH TEST//
  var atm = new ATM(),
  user = null;
  describe('constructor', function() {
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
    it("should be able to create new account", function() {
      user = atm.newAccount(1000, 5577);
      expect(user.constructor.name).to.equal("Account");
    });
  });
});