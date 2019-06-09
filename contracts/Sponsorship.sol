pragma solidity ^0.5.0;
import "./HackathonMunon.sol";
import "node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract Sponsorship is Ownable {
  event LogSponsorship(address _from, uint _value);
  using SafeMath for uint256;
  address payable public hackathonAddress;
  uint public hackathon1;
  uint public hackathon2;

  constructor(address payable _hackathonAddress, uint _hackathon1, uint _hackathon2) public {
    Ownable(msg.sender);
    hackathonAddress = _hackathonAddress;
    hackathon1 = _hackathon1;
    hackathon2 = _hackathon2;
  }

  function setHackathon1(uint _id) public onlyOwner {
    hackathon1 = _id;
  }

  function setHackathon2(uint _id) public onlyOwner {
    hackathon2 = _id;
  }

  function addSponsorship() public payable {
    emit LogSponsorship(msg.sender, msg.value);
  }

  function splitSponsorship() public {
   HackathonMunon hack = HackathonMunon(hackathonAddress);
   uint splitBalance = address(this).balance.div(2);
   hack.sponsor.value(splitBalance)(1);
   hack.sponsor.value(splitBalance)(2);
  }

  function() external payable{
   emit LogSponsorship(msg.sender, msg.value);
  }
}
