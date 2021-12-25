const Issuer = artifacts.require("Issuer");

// Traditional Truffle test
contract("Issuer", (accounts) => {
  it("Should return the new greeting once it's changed", async function () {

    const issuer = await Issuer.deployed();

    console.log(issuer.mapTheVC.send("Hash" , function(value) {
      issuer.events.HashSaved(function(error, event){ console.log(event); })
    }));

    // var event = await issuer.methods.mapTheVC.call("Hash").call(function(error, result) {
    //   console.log("Funnnnnction :")
    //   if (!error)
    //       console.log(result);

    // });

  //   issuer(function(instance) { return instance.mapTheVC.call("Hash") }).then(function (value) {
  //     // Now value contains the return value os the sayHello() function
  //     console.log(value);
  //  })

      // assert.equal(await issuer.mapTheVC.call('Fuckk') ,'Fuck blockchain');
      

      
  });

});