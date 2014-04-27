//PROMPT_SCHEMAS.JS//
//MODULE FOR ORGANZING NPM PROMPT SCHEMAS//

var promptSchemas = {

  defaultSchema: {
    properties: {
      "default screen": {
        description: "Welcome to the ATM!\nChoose 1 for transaction or 2 to open a new account..",
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
        message: "account number must contain only numbers",
        required: true
      },
      pin: {
        pattern: /[0-9][0-9][0-9][0-9]/,
        message: "pin must be 4 digit number",
        required: true
      }
    }
  },
};

module.exports = promptSchemas;