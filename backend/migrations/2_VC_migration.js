const Verification = artifacts.require("./verification.sol");

module.exports = function (deployer) {
  deployer.deploy(Verification);
};