// const PoE = artifacts.require("./Issuer.sol");
// const crypto = require("crypto");
// const chai = require("chai");

const fs = require("fs");
const { type } = require("os");
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



var Verification_json = Verification_json = require("/Users/dorsa/Desktop/lessons/software engineering/project /DevDID/backend/build/contracts/Verification.json");
var contract_address = Verification_json['networks']['5777']['address'];//is it 5777 in all cases ?
var abi = Verification_json['abi'];
var verf_contract = new web3.eth.Contract(abi,contract_address);
console.log("abi: ",abi);

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

}


/*
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
*/



var msg = "my message";
var sign;

let sign_res = signTest(msg) 
sign_res.then(function(result) {
  //console.log("hashedmsg and signiture: ",result);
  verif(result);
})








  


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