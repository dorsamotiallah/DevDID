const { resolve } = require("dns");
const fs = require("fs");
const { type } = require("os");
var Web3 = require('web3');
var web3 = new Web3("HTTP://127.0.0.1:7545");


var Verification_json = Verification_json = require("/Users/dorsa/Desktop/lessons/software engineering/project /DevDID/backend/build/contracts/Verification.json");
var contract_address = Verification_json['networks']['5777']['address'];//is it 5777 in all cases ?
var abi = Verification_json['abi'];
var verf_contract = new web3.eth.Contract(abi,contract_address);
//console.log("abi: ",abi);



const signTest = async function(msg,account){


  let hashedmessage = await verf_contract.methods.getHash(msg).call();

  //console.log("hashnsg : ",hashedmessage);

  let prefixed_hashed_msg = await verf_contract.methods.getEthSignedHash(hashedmessage).call();

  //console.log("sign : ",prefixed_hashed_msg);

  let signature = await web3.eth.sign(hashedmessage,account,function (err , res) {
    if (err) {
      console.log('sigature Error : ' , err)
    }
    else {
      console.log('Signature Success : ' , res)
    }
  });

  return new Promise(resolve => {
    resolve([prefixed_hashed_msg,signature]);
  });

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


  return new Promise(resolve => {
    resolve(public_key);
  });

}



async function issuer (raw_vc,account){

  let sign_res = await signTest(raw_vc);//[prefixed_hashed_msg,signature]
  //console.log("hashedmsg and signiture: ",sign_res);
  var issued_vc = {};
  issued_vc["issuer public_key"] = account; 
  issued_vc["meta data"] = raw_vc;
  issued_vc["prefixed hashed message"] = sign_res[0];
  issued_vc["signature"] = sign_res[1];
  console.log("issued vc : ",issued_vc);

  return new Promise(resolve => {
    resolve(issued_vc);
  });

}



async function holder (issued_vc,account){
  let sign_res = await signTest(issued_vc);//[prefixed_hashed_msg,signature]
  //console.log("hashedmsg and signiture: ",sign_res);
  var holder_vc = {};
  holder_vc["issuer public_key"] = issued_vc["issuer public_key"];
  holder_vc["meta data"] = issued_vc["meta data"];
  holder_vc["issuer prefixed hashed vc"] = issued_vc["prefixed hashed message"];
  holder_vc["issuer signature"] = issued_vc["signature"];
  holder_vc["holder public_key"] = account;
  holder_vc["holder prefixed hashed vc"] = sign_res[0];
  holder_vc["holder signature"] = sign_res[1];
  console.log("holder vc : ",holder_vc);

  return new Promise(resolve => {
    resolve(holder_vc);
  });

}

async function verifier(holder_vc){
  
  var issuer_public_key = await verif([holder_vc["issuer prefixed hashed vc"],holder_vc["issuer signature"]]);

  var holder_public_key = await verif([holder_vc["holder prefixed hashed vc"],holder_vc["holder signature"]]);

  if(issuer_public_key === holder_vc["issuer public_key"]){
    console.log("issuer successfully verified");
  }

  if(holder_public_key === holder_vc["holder public_key"]){
    console.log("holder successfully verified");
  }

}

async function getAccounts(){
  let accounts = await web3.eth.getAccounts();

  console.log("accounts : ",accounts);

  return new Promise(resolve => {
    resolve([accounts[0],accounts[1],accounts[2]]);
  });
}



async function main(){
  var issuer_account ;
  var holder_account ;
  var verifier_account;

  var accounts = await getAccounts();

  issuer_account = accounts[0];
  holder_account = accounts[1];
  verifier_account = accounts[2];

  console.log(issuer_account);
  console.log(holder_account);
  console.log(verifier_account);

  var raw_vc = {};
  
  var issuer_vc = issuer("raw_vc",issuer_account);

  var holder_vc = holder (issuer_vc,holder_account);

}

main()
