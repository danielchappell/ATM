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
        description: "please enter an initial deposit\nin the following format: $1500.00",
        pattern: /[0-9]+\.[0-9][0-9]/,
        message: "format must include dollar sign and two decimals: $1500.00",
        required: true
      },
      "secure pin": {
        description: "enter a 4 digit number that will\nserve as your secure pin..",
        pattern: /[0-9][0-9][0-9][0-9]/,
        message: "must be a 4 digit number..",
        required: true,
        hidden: true
      },
      "verify pin": {
        description: "verify your pin number..",
        pattern: /[0-9][0-9][0-9][0-9]/,
        message: "must be a 4 digit number..",
        required: true,
        hidden: true
      }
    }
  }
};

module.exports = promptSchemas;