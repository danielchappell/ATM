var chai = require('chai'),
ATM = require('../atm.js'),
expect = chai.expect;
chai.should()


//TESTS FOR ATM.JS//

describe("ATM", function() {
  //CREATE NEW INSTANCE FOR EACH TEST//
  var atm = new ATM();

  describe('constructor', function() {
    it("should initialize", function() {
      expect(atm.constructor.name).to.equal("ATM");
    });
  });
});