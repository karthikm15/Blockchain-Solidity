// // Import libraries
// const assert = require('assert');
// const ganache = require('ganache-cli');
// const Web3 = require('web3');

// const web3 = new Web3(ganache.provider())

// class Car {
//     park(){
//         return 'stopped';
//     }
//     drive(){
//         return 'vroom';
//     }
// }

// /* 
// BeforeEach - can initialize variables beforehand that can be used in the describe function
//     - Runs right before you call an it function
//     - Remember to declare variables outside of beforeEach because of scope
// Describe Function Parameters:
//     1. Just a string that will give us a reference point. Not related to the Car class.
//     2. Arrow Function - all the "it" testing statements that we will run on class car
//          - It Function Parameters:
//             1. Just a string that will give us a reference point.
//             2. Arrow Function - inside arrow function, define instance and make assertions
// */

// let car;

// beforeEach(() => {
//     car = new Car();
// });

// describe('Car', () => {
//     it('can park', () => {
//         assert.equal(car.park(), 'stopped');
//     });

//     it('can drive', () => {
//         assert.equal(car.drive(), 'vroom');
//     })
// });

// /* To run the function: 
//     1. Go to the package.json file and inside the "scripts" :{"test":"mocha"} list, type in "mocha" 
//         - Original version: "No test specified and exits"
//     2. Run "npm run test"
//         - Will check out all of the assert function
// */

