const Issuer = artifacts.require("./VC.sol");

module.exports = function (deployer) {
  deployer.deploy(VC);
};