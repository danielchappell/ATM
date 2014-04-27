//PROMPT_SCHEMAS.JS//
//MODULE FOR ORGANZING NPM PROMPT SCHEMAS//

var promptSchemas = {

  defaultSchema: {
    properties: {
      "default screen": {
        description: "welcome to the ATM!\nchoose 1 for transaction or 2 to open a new account..",
        pattern: /[12]/,
        message: "please choose 1 for transaction or 2 for new account",
        required: true
      }
    }
  },

  loginSchema: {
    properties: {
      "account number": {
        pattern: /[0-9]+/,
        message: "account number must contain only numbers..",
        required: true
      },
      "pin": {
        pattern: /[0-9][0-9][0-9][0-9]/,
        message: "pin must be 4 digit number..",
        required: true,
        hidden: true
      }
    }
  },

  userRegistration: {
    properties: {
      "initial deposit": {
        pattern: /[0-9]+\.[0-9][0-9]/,
        message: "format must include dollar sign and two decimals: $1500.00",
        required: true
      },
      "secure pin": {
        pattern: /[0-9][0-9][0-9][0-9]/,
        message: "must be a 4 digit number..",
        required: true,
        hidden: true
      },
      "verify pin": {
        pattern: /[0-9][0-9][0-9][0-9]/,
        message: "must be a 4 digit number..",
        required: true,
        hidden: true
      }
    }
  },

  anotherTransaction: {
    properties: {
      "another transaction?": {
        pattern: /y[es]*|n[o]?/,
        message: "must answer yes or no..",
        required: true
      }
    }

  }
};

module.exports = promptSchemas;