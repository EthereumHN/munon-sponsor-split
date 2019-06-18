var Sponsorship = artifacts.require("./Sponsorship.sol");
var HackathonMunon = artifacts.require("./HackathonMunon.sol");

module.exports = function(deployer, network) {
  if (network == "mainnet") {
    deployer.deploy(
      Sponsorship,
      "0x380a9a27227d28e47f412fdbb073c9e1a049e0b1",
      1,
      2
    );
  } else if (network == "development") {
    deployer.deploy(HackathonMunon).then(async instance => {
      await deployer.deploy(Sponsorship, instance.address, 1, 2);
    });
  }
};
