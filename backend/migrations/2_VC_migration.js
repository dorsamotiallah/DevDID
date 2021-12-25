const Issuer = artifacts.require("./Issuer.sol");

module.exports = function (deployer) {
  deployer.deploy(Issuer);
};