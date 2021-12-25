// const PoE = artifacts.require("./Issuer.sol");
// const crypto = require("crypto");
// const chai = require("chai");

var Web3 = require('web3');
var web3 = new Web3("HTTP://127.0.0.1:7545");
var acc = 'ccb5feed0f80356a85e7b17f15723f6790d54796e3a531822083a2196b9425ae' ;
var sign = "";
var message = "message1";
console.log('input : ',message)

// hash
  const messageHashed = web3.utils.sha3( message )
  console.log('message : ', messageHashed)
// sign



const signTest = async function(){

  // Using eth.sign()

  let accounts = await web3.eth.getAccounts();
  console.log("Accounts : " ,  accounts)
  let msg = "Some data"

  let prefix = "\x19Ethereum Signed Message:\n" + msg.length
  let msgHash1 = web3.utils.sha3(prefix+msg)

  console.log("Account 0 : " , accounts[0] )

  let sig1 = await web3.eth.sign(msg, accounts[0],function (err , res) {
    if (err) {
      console.log('Error : ' , err)
    }
    else {
      console.log('Success : ' , res)
    }
  });

    return [msg,sig1]
}

const verif = async function (input) {

  console.log("Input : " , input)

  let whoSigned1 = await web3.eth.accounts.recover(input[0], input[1],function (err , res) {
    if (err) {
      console.log('Error1 : ' , err)
    }
    else {
      console.log('Success1 : ' , res)
    }
  }
    
    );

    console.log("sender : ", whoSigned1)

}

let res = signTest() 
// console.log("res : " ,  res)
res.then(function(result) {
  console.log(result) // "Some User token"
  verif(result)
})
// let a = verif(res)


  


  


// const id1 = 1;
// const address1 = '0xc06C96FCFdBB6A20C811c8D1d751d4b11D5AD458';
// const message1 = "Some document";
// const docHash1 = sha256AsHexString(message1); // Creating hashes

// function sha256AsHexString(doc) {
//     return "0x" + crypto.createHash("sha256").update(doc, "utf8").digest("hex");
// }

// // Signing The VC's
// web3.eth.sign(message1,address1,function(err , result) {
//     console.log("Event :")
//     console.log(result,err)
// })


// // Finally testing the contract to deploy 
// var abi = [
//     {
//       inputs: [],
//       stateMutability: 'nonpayable',
//       type: 'constructor',
//       constant: undefined,
//       payable: undefined
//     },
//     {
//       anonymous: false,
//       inputs: [Array],
//       name: 'HashSaved',
//       type: 'event',
//       constant: undefined,
//       payable: undefined,
//       signature: '0xdd86a2b7b2d8557a93551c3f578adcc374ed780b8abf22f822d841b37a6cf290'
//     },
//     {
//       inputs: [Array],
//       name: 'mapTheVC',
//       outputs: [],
//       stateMutability: 'nonpayable',
//       type: 'function',
//       constant: undefined,
//       payable: undefined,
//       signature: '0xff1c8558'
//     }
//   ]

// var contract = new web3.eth.Contract(abi,"0x5279E7Dc0F6650C7064a8716E7c7D43F76A179aE")


// var event = contract.methods.mapTheVC(function(error, result) {
//     console.log("Function :")
//     if (!error)
//         console.log(result);
    
// });

// contract.events.HashSaved(function(error, event){ console.log(event); })