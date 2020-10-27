pragma solidity ^0.4.17;

contract Test {
    string[] public myArray;

    function Test() public {
        myArray.push("hi");
    }

    // Can not do this because can not work with nested dynamic arrays since strings are dynamic arrays
    function getArray() public view returns (string[]) {
        return myArray;
    }
}