const verification = artifacts.require("verification.sol");

// Traditional Truffle test
contract("verification", (accounts) => {
  
  it("Should return the new greeting once it's changed", async function () {
    value = "test value1"
    verification.deployed()
    .then (instance => instance.getHash.call(value))
    .then (result => {
      assert.equal(result , web3.utils.soliditySha3(value)  );
    }); });

});