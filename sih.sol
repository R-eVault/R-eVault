// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract DocumentManager {
    struct Document {
        string documentHash; 
        uint256 timestamp;
    }
    struct Case{
        uint256 cid;
        string name;
        string info;
        uint256 startdate;
    }
    struct Lawyer{
        string name;
        string gid;
        string password;
    }

    mapping(address => mapping(uint256 => Document[] )) private documents;
    mapping(address => Lawyer) private lawyers;
    mapping(address => Case[]) private cases;

    uint256 private documentCount;
    uint256 private lawyerid;
    uint256 private caseid;

    event DocumentUploaded(uint256 indexed documentId, address indexed owner, string documentHash, uint256 timestamp);

    constructor() {
        documentCount = 0;
        lawyerid=0;
        caseid=0;
    }  

    // FOR LAWYER AUTHENTICATION
    function regLawyer(string memory name,string memory password,string memory gid) external {
        // use oracle in this
        
    }
    function loginLawyer(string memory password) external view  onlyRegisteredLawyer returns (bool,Lawyer memory) {
        string memory pd = lawyers[msg.sender].password;
        if (keccak256(abi.encodePacked(password)) == keccak256(abi.encodePacked(pd))) {
            return (true,lawyers[msg.sender]); 
        } else {
            return (false,lawyers[msg.sender]); 
        }
    }

    // FOR LAWYER DATA MANAGEMENT
    modifier onlyRegisteredLawyer() {
        require(bytes(lawyers[msg.sender].name).length > 0, "You must be a registered lawyer to upload a case");
        _;
    }
    function uploadDocument(string memory _documentHash,uint256 cid) external onlyRegisteredLawyer {
        require(bytes(_documentHash).length > 0, "Document hash cannot be empty");
        require(cid >= 0, "Name cannot be empty");
        uint256 documentId = documentCount++;
        documents[msg.sender][cid].push(Document( _documentHash, block.timestamp));
        emit DocumentUploaded(documentId, msg.sender, _documentHash, block.timestamp);
    }
    function uploadCase(string memory name,string memory details) external onlyRegisteredLawyer {
        require(bytes(name).length > 0, "Name cannot be empty");
        require(bytes(details).length > 0, "Details cannot be empty");
        require(bytes(lawyers[msg.sender].name).length > 0, "You must be a registered lawyer to upload a case");
        uint256 cid = caseid++;
        cases[msg.sender].push(Case(cid,name,details,block.timestamp));
    }
    function getDocument(uint256 cid) external view onlyRegisteredLawyer returns (Document[] memory)  {
        return documents[msg.sender][cid];
    }
    function getCase() external view onlyRegisteredLawyer returns (Case[] memory){
        return cases[msg.sender];
    }
}