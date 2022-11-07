// SPDX-License-Identifier: MIT


pragma solidity ^0.8.0;

//bool (FALSE, TRUE)
//int* (max256 min8) int8 = -128 / 127; int16 = -32768 / 32767
//uint* (max256 min8) uint8 = 255 uint16 = 65535
//address (uint160)
// Struct
contract TypesOfData{
    uint16 test = 65535;

    struct Payment {
        uint amount;
        uint timestamp;
        address from;
        string message;
    }

    struct Balance {
        uint totalPayments;
        mapping(uint => Payment) payments;
    }

    mapping(address => Balance) public balances;

    function getPayment(address _addr, uint _index) public view returns(Payment memory) {
        return balances[_addr].payments[_index];
    }

    function pay(string memory message) public payable {
        uint paymentNum = balances[msg.sender].totalPayments;
        balances[msg.sender].totalPayments++;

        Payment memory newPayment = Payment(
            msg.value,
            block.timestamp,
            msg.sender,
            message
        );

        balances[msg.sender].payments[paymentNum] = newPayment;
    }
    

    //Byte max bytes32 --> 32 * 8 = 256(max length)
    bytes32 public testString1 = 'test';
    bytes public testString2 = 'test';
    function viewBytesDiff() public view returns (bytes1){
        return testString2[0];
    }
    function viewBytesDiff2() public view returns (bytes32){
        return testString1;
    }

    //Array 
    uint[] public unlimitedList;
    function pushInUlimitedList() public {
        unlimitedList.push(3);
    }

    function sampleMemory() public view returns (uint[] memory){
        uint[] memory tempArray = new uint[](10);
        tempArray[0] = 1;
        return tempArray;
    }
    uint[100] public list;
    uint[3][2] public items;

    function setItems() public {
        items = [
            [1, 2, 3],
            [4, 5, 6]
        ];
    }

    // Enum
    enum status {one, two, three}
    status public eny_var;

    function set_var_two() public{
        eny_var = status.two;
    }

    function set_var_three() public{
        eny_var = status.three;
    }

}