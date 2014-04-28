#ATM
 Written as a Node.js script with a simple command line user interface.
##Features
  - Autonomic Bank User Interface
  - Bank/ATM can create new accounts
  - Account are verified by Pin and secret Bank ID
  - All account data is hidden and secure
  - ATM authenticates a user session for multiple transactions
  - Users can..
    1. Print Balance
    2. Change Pin
    3. Make Deposit
    4. Make Withdrawl
    5. Print Account Ledger

##Setup

###Install Node.js
  First you must have Node.js installed globally on your machine.
  You can easily do this from the main website [Node.js](http://nodejs.org)

###Install Dependencies
  After clone and CD into directory..

  ```bash
  $ npm install
  ```
##Launch Program
  ```bash
  $ node app.js
  ```
  If all goes as planned ATM should run continually in the terminal window until interruped(CTRL-C) or closed.

##Tests and Development
  ATM is a work in progress, bug reports and pull requests are welcome!

###Tests
  Our tests are written in [Mocha](http://http://visionmedia.github.io/mocha) with [Chai](http://chaijs.com) assertions and [Sinon](http://sinonjs.org) for stubbing and mocking

  To Run Tests..
  ```bash
  $ mocha
  ```