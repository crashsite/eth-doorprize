pragma solidity ^0.4.17;

contract DoorPrize {
    address public manager;
    uint eventCode;
    address[] public players;
    uint playerCount;
    mapping(address => bool) checkPlayers;
    
    //Constructor
    constructor(uint code) public payable {
        manager = msg.sender;
        eventCode = code;
        players.push(msg.sender);
        checkPlayers[msg.sender] = true;
    }
    
    // Enter your address to join the 
    function enter(uint code) public payable {
        require(checkPlayers[msg.sender] == false);
        require(eventCode == code);
        players.push(msg.sender); 
        checkPlayers[msg.sender] = true;
    }
    
    // Internal kind of random number generator
    function random() private view returns (uint) {
        return uint(keccak256(block.difficulty, now,  players));
    }
    
    // Pick a Winner of the Prize
    function pickWinner() public restricted {
        address playerAddress = this;
        uint index = random() % players.length;
        
        players[index].transfer(playerAddress.balance);
        players = new address[](0);
        playerCount = 0;
    }
    
    // Restrict sender to manager
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    // Get a list of players
    function getPlayers() public view returns (address[]) {
        return players;
    }
    
    // Get the number of players
    function getPlayerCount() public view returns(uint) {
        return playerCount;
    }
}