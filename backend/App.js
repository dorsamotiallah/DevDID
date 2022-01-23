const { resolve } = require("dns");
const fs = require("fs");
const { type } = require("os");
var Web3 = require('web3');
var web3 = new Web3("HTTP://127.0.0.1:7545");
var express = require('express');
var app = express();
var bodyParser = require("body-parser");

// Retrieve ABI & Contract address from Smart contract JSON
var Verification_json = Verification_json = require("D:/Education/University/TERM7/Narm1/Project/Development/Project/DevDID/backend/build/contracts/Verification.json");
var contract_address = Verification_json['networks']['5777']['address'];
var abi = Verification_json['abi'];
// Connecting to smart contract
var verf_contract = new web3.eth.Contract(abi,contract_address);
// console.log("\nabi: ",abi);

async function accounts () {
//setting role's accounts
  var accounts = await web3.eth.getAccounts();
  var issuer_account = accounts[0];
  var holder_account = accounts[1];
  var verifier_account = accounts[2];

  return [issuer_account,holder_account,verifier_account];
}

//holders storage
var vcs = [];
var vc_request = [];


// SIGNING
const signTest = async function(msg,account){

  //Hashing the input message 
  let hashedmessage = await verf_contract.methods.getHash(msg).call();

  console.log("hashnsg : ",hashedmessage);

  // Hashing again with prefix added to last hash 
  let prefixed_hashed_msg = await verf_contract.methods.getEthSignedHash(hashedmessage).call();

  //console.log("sign : ",prefixed_hashed_msg);

  // Signing the hashed message
  let signature = await web3.eth.sign(hashedmessage,account,function (err , res) {
    if (err) {
      console.log('sigature Error : ' , err)
    }
    else {
      console.log('\nSignature Success : ' , res)
    }
  });

  // Return values came from signing
  return new Promise(resolve => {
    resolve([prefixed_hashed_msg,signature]);
  });

}

// Retrieving the sender of the message 
const verif = async function (input) {

  console.log("Verif Input : " , input);
  var signature = input[1];
  // Splitting signature
  var r = signature.slice(0, 66);
  var s = "0x" + signature.slice(66, 130);
  var v = "0x" + signature.slice(130, 132);
  v = web3.utils.toDecimal(v);
  v = v + 27;

  // Sender public key reveals by using "verify" method in verification contract
  let public_key = await verf_contract.methods.verify(input[0],r,s,v).call();

  console.log("\nsender : ", public_key);


  return new Promise(resolve => {
    resolve(public_key);
  });

}


// Issuing vc , raw vc contains metadata and claims and account refers to Issuer Blockchain account
async function issuer (raw_vc,account){
  // Combine raw_vc and account to create a signature for later VC
  let sign_res = await signTest(raw_vc,account);//[prefixed_hashed_msg,signature]
  console.log("hashedmsg and signiture: ",sign_res);
  
  var issued_vc = {}; // It is supposed to be result of Issuer Role
  issued_vc["issuer public_key"] = account; 
  issued_vc["meta data"] = raw_vc;
  issued_vc["prefixed hashed message"] = sign_res[0];
  issued_vc["signature"] = sign_res[1];

  console.log("\nissuer vc : ",issued_vc);

  return new Promise(resolve => {
    resolve(issued_vc);
  });

}


// Issuing vc , issued_vc comes from Issuer and account refers to Holder Blockchain account
async function holder (issued_vc,account){
  // Combine issued_vc and account to create a signature for current VC
  let sign_res = await signTest(issued_vc,account);//[prefixed_hashed_msg,signature]

  console.log("hashedmsg and signiture: ",sign_res);

  var holder_vc = {};// It is supposed to be result of Holder Role
  holder_vc["issuer public_key"] = issued_vc["issuer public_key"];
  holder_vc["meta data"] = issued_vc["meta data"];
  holder_vc["issuer prefixed hashed vc"] = issued_vc["prefixed hashed message"];
  holder_vc["issuer signature"] = issued_vc["signature"];
  holder_vc["holder public_key"] = account;
  holder_vc["holder prefixed hashed vc"] = sign_res[0];
  holder_vc["holder signature"] = sign_res[1];

  console.log("\nholder vc : ",holder_vc);

  return new Promise(resolve => {
    resolve(holder_vc);
  });

}


// VERIFYING VC
async function verifier(holder_vc){
  // Retrieving holder and Issuer public keys by using verif function 

  // verifying issuer using issuer prefixed hashed and issuer signature
  var issuer_public_key = await verif([holder_vc["issuer prefixed hashed vc"],holder_vc["issuer signature"]]);

  // verifying holder using holder prefixed hashed and holder signature
  var holder_public_key = await verif([holder_vc["holder prefixed hashed vc"],holder_vc["holder signature"]]);


  if (issuer_public_key === holder_vc["issuer public_key"]){
    console.log("\nissuer successfully verified");

    if (holder_public_key === holder_vc["holder public_key"]){
      console.log("\nholder successfully verified");
      return "Valid VC";

    }

    return "Valid Issuer , Invalid Holder";
    
  }

  return "Invalid Issuer , Invalid Holder";

  

}

/*
async function main(){
  var issuer_account ;
  var holder_account ;
  var verifier_account;
  // Ganache accounts list
  var accounts = await web3.eth.getAccounts();
  console.log("Accounts (Public keys) : " , accounts)

  issuer_account = accounts[0];
  holder_account = accounts[1];
  verifier_account = accounts[2];

  console.log("\nissuer public key : ",issuer_account);
  console.log("\nholder public key : ",holder_account);
  console.log("\nverfier public key : ",verifier_account);

  var raw_vc = {"title" : "University degree",
                "description": "computer science bachelor",
                "date" : "12/26/2021"
              };
  
  var issuer_vc = await issuer(raw_vc,issuer_account);

  var holder_vc = await holder (issuer_vc,holder_account);

  await verifier(holder_vc);

}

main()


*/
app.use(bodyParser.json());


app.post('/sign_by_issuer',async function(req,res){
  let accs = await accounts();

  console.log("Accs :" , accs);
  console.log("Body : ",req.body);
  var meta_data = req.body;
  var issuer_vc = await issuer(meta_data,accs[0]);
  res.json(issuer_vc);
  res.end();

})

app.post('/sign_by_holder',async function(req,res){
  let accs = await accounts();
  
  console.log("Accs :" , accs);
  console.log("Body : ",req.body);
  var issuer_vc = req.body;

  var holder_vc = await holder (issuer_vc,accs[1]);

  res.json(holder_vc);
  res.end();

})

app.post('/verification',async function(req,res){
  let accs = await accounts();
  
  console.log("Accs :" , accs);
  console.log("Body : ",req.body);
  var holder_vc = req.body;
  // console.log("Body : ",meta_data);
  let result = await verifier(holder_vc);
  res.json(result);
  res.end();

})




var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})
