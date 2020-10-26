pragma solidity ^0.4.17;

contract Test {
    uint[] public myArray;

    // Constructor function - initializes an array of size 3
    function Test() public {
        myArray.push(1);
        myArray.push(10);
        myArray.push(30);
    }

    // Returns the entire array
    function getMyArray() public view returns (uint[]) {
        return myArray;
    }

    // Returns the array length
    function getArrayLength() public view returns (uint) {
        return myArray.length;
    }
    
    // Gets the first element of the array
    function getFirstElement() public view returns (uint) {
        return myArray[0];
    }
}