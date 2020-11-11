pragma solidity ^0.4.17;

contract CampaignFactory {
    /* Variables:
        1. deployedCampaigns - addresses of all deployed campaigns
    */
    
    address[] public deployedCampaigns;
    
    /* Functions:
        1. createCampaign - deploys a new instance of a Campaign and stores the resulting address
        2. getDeployedCampaigns - returns a list of all deployed campaigns
    */
    
    function createCampaign(uint minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaigns() public view returns (address[]){
        return deployedCampaigns;
    }
}

contract Campaign {
    
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount; // If approvalCount is greater than 50% of contributors, then can request - DO NOT need people who say 'no'
        mapping(address => bool) approvals; // People who provided approvals - don't need to initialize in beginning (only need to initialize value structs)
    }
    
    /* Variables:
        1. manager - address of person who is managing the campaign
        2. minimumContribution - minimum donation required to be considered a contributor of
        3. approvers - mapping of addresses for every person who has donated money
            - have a key for the address and then the value would be true (reason not set to false, is because default value for nonexistent key is false)
        4. requests - list of requests that the manager has created (data type of Request, made by a struct)
            - has description (describes why request being created), value (amount of money that manager wants to send to vendor),
            recipient (adress that the money will be sent to), complete (true if request has already been processed (money sent)),
            voting mechanism
        5. approversCount - keeps track of number of approvers
    */
    address public manager;
    uint public minimumContribution;
    Request[] public requests;
    mapping(address => bool) public approvers;
    uint public approversCount;
    
    // Function modifier - to restrict access to createRequest and finalizeRequest - norm is to keep these above the functions
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    
    /* Functions:
        1. Campaign - constructor function that sets the minimumContribution and the owner
        2. contribute - called when someone wants to donate money to the campaign and become an 'approver'
        3. createRequest - called by the manager to create a new 'spending request'
        4. approveRequest - called by each contributor to approve a spending request
        5. finalizeRequest - after a request has gotten enough approvals, the manager can call this to get money sent to the vendor
    */
    
    function Campaign(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }
    
    function contribute() public payable {
        require(msg.value > minimumContribution);
        
        approvers[msg.sender] = true;
        approversCount++;
    }
    
    function createRequest(string description, uint value, address recipient) public restricted {
        
        /*Creates an instance of the Request data type - need to define every property
            - Only storage variables are the ones declared above (manager, minimumContribution, etc.)
            - Request({...}) is stored in memory then - need to explicitly say that
        */

        Request memory newRequest = Request({
           description: description,
           value: value,
           recipient: recipient,
           complete: false,
           approvalCount: 0
        });
        
        // Alternative Syntax: Request newRequest = Request(description, value, recipient, false);
        
        requests.push(newRequest);
    }
    
    /* ApproveRequest - what need to make sure can't happen:
        - one person cannot vote multiple times
        - should be resilient regardless of how many contributors there would be */
    function approveRequest(uint index) public {
        Request storage request = requests[index];
        
        require(approvers[msg.sender]); // Exit if person isn't part of approvers
        require(!request.approvals[msg.sender]); // Exits if person has already voted on request
        
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }
    
    /* FinalizeRequest - make sure the transaction is already not complete (using bool complete)
        - Need to check if have enough approvals to finalize transactions (> 50%) 
        - Transfer the money to the recipient */
        
    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        
        require(request.approvalCount > (approversCount/2));
        require(!request.complete);
        
        request.recipient.transfer(request.value);
        request.complete = true;
        
    }

    // Get some statistics so that we can easily access in webpage
    function getSummary() public view returns (
        uint, uint, uint, uint, address
    ) {
        return (
            minimumContribution,
            this.balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }

}