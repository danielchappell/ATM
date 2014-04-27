var promptSchemas, colors;
colors = require('colors');
//PROMPT_SCHEMAS.JS//
//MODULE FOR ORGANZING NPM PROMPT SCHEMAS//

promptSchemas = {

  defaultSchema: {
    properties: {
      "default screen": {
        description: "welcome to the ATM!\nchoose 1 for transaction or 2 to open a new account..".green,
        pattern: /[12]/,
        message: "please choose 1 for transaction or 2 for new account",
        required: true
      }
    }
  },

  loginSchema: {
    properties: {
      "account number": {
        description: "account number".green,
        pattern: /[0-9]+/,
        message: "account number must contain only numbers..".red,
        required: true
      },
      "pin": {
        description: "pin".green,
        pattern: /[0-9][0-9][0-9][0-9]/,
        message: "pin must be 4 digit number..".red,
        required: true,
        hidden: true
      }
    }
  },

  userRegistration: {
    properties: {
      "initial deposit": {
        description: "initial deposit: format: 00.00:".green,
        pattern: /^[0-9]+\.[0-9][0-9]$/,
        message: "format two decimals: 1500.00".red,
        required: true
      },
      "secure pin": {
        description: "secure pin: 4 digit number:".green,
        pattern: /[0-9][0-9][0-9][0-9]/,
        message: "must be a 4 digit number..".red,
        required: true,
        hidden: true
      },
      "verify pin": {
        description: "verify pin".green,
        pattern: /[0-9][0-9][0-9][0-9]/,
        message: "must be a 4 digit number..".red,
        required: true,
        hidden: true
      }
    }
  },

  anotherTransaction: {
    properties: {
      "another transaction?": {
        description: "another transaction?".green,
        pattern: /y[es]*|n[o]?/,
        message: "must answer yes or no..".red,
        required: true
      }
    }
  },

  transactionMenu: {
    properties: {
      "transaction menu": {
        menu: "Transaction Menu:\n".blue +
              "enter 1 for balance inquery\n".blue +
              "enter 2 to print account ledger\n".blue +
              "enter 3 to change pin number\n".blue +
              "enter 4 to withdraw funds\n".blue +
              "enter 5 to deposit funds\n".blue,
        description: "enter choice 1-5".green,
        pattern: /[1-5]/,
        required: true
      }
    }
  },

  newPin: {
    properties: {
      "new pin": {
        description: "new pin".green,
        pattern: /[0-9][0-9][0-9][0-9]/,
        message: "must be a 4 digit number..".red,
        required: true,
        hidden: true
      }
    }
  }

};

module.exports = promptSchemas;