var Sponsorship = artifacts.require("./Sponsorship.sol");
var HackathonMunon = artifacts.require("./HackathonMunon.sol");

module.exports = function(deployer, network) {
  if (network == "live") {
  } else if (network == "rinkeby") {
  } else {
    deployer.deploy(HackathonMunon).then(async instance => {
      await deployer.deploy(Sponsorship, instance.address, 1, 2);
    });
  }
};
