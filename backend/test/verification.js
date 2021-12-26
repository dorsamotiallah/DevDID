const verification = artifacts.require("./verification.sol");

// Traditional Truffle test
contract("verification", (accounts) => {

  
  it("Should return the new greeting once it's changed", async function () {

    const verf_contract = await verification.deployed();
    

    const signTest = async function(msg){

      let accounts = await web3.eth.getAccounts();
    
      console.log("accounts : ",accounts);
    
      //console.log("here");
    
      let hashedmessage = await verf_contract.methods.getHash(msg).call();
    
      //console.log("hashnsg : ",hashedmessage);
    
      let prefixed_hashed_msg = await verf_contract.methods.getEthSignedHash(hashedmessage).call();
    
      //console.log("sign : ",prefixed_hashed_msg);
    
      let signature = await web3.eth.sign(hashedmessage,accounts[0],function (err , res) {
        if (err) {
          console.log('sigature Error : ' , err)
        }
        else {
          console.log('Signature Success : ' , res)
        }
      });
    
      return [prefixed_hashed_msg,signature];
    }

    const verif = async function (input) {

      console.log("Verif Input : " , input);
      var signature = input[1];
      var r = signature.slice(0, 66);
      var s = "0x" + signature.slice(66, 130);
      var v = "0x" + signature.slice(130, 132);
      v = web3.utils.toDecimal(v);
      v = v + 27;
    
      let public_key = await verf_contract.methods.verify(input[0],r,s,v).call();
    
      console.log("sender : ", public_key);
      return public_key;
    
    }

    var msg = "my message";

    let sign_res = signTest(msg) 
    sign_res.then(function(result) {
      // console.log("hashedmsg and signiture: ",result);
      assert.equal(verif(result) , accounts[0]);
    })

    

    

    // console.log(verification.mapTheVC.send("Hash" , function(value) {
    //   verification.events.HashSaved(function(error, event){ console.log(event); })
    // }));

    // var event = await verification.methods.mapTheVC.call("Hash").call(function(error, result) {
    //   console.log("Funnnnnction :")
    //   if (!error)
    //       console.log(result);

    // });

  //   verification(function(instance) { return instance.mapTheVC.call("Hash") }).then(function (value) {
  //     // Now value contains the return value os the sayHello() function
  //     console.log(value);
  //  })

      // assert.equal(await verification.mapTheVC.call('Fuckk') ,'Fuck blockchain');
      

      
  });

});