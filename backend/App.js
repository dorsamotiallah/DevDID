require('dotenv').config() ;

const Web3 = require('web3');

// const infuraKey = process.env.INFURA_KEY;

const web3 = new Web3(new Web3.providers.HttpProvider( 'HTTP://127.0.0.1:7545'));


const your_contract = new web3.eth.Contract(
    [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_sendToAccount",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "_ipfsHash",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_description",
              "type": "string"
            }
          ],

          "stateMutability": "nonpayable",
          "type": "constructor"
        },

        {
          "inputs": ['False'],
          "name": "active",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },

        {
          "inputs": ['did:git:1'],
          "name": "contractOwner",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": ['VC test 1'],
          "name": "description",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": ['0xhash'],
          "name": "ipfsHash",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": ['Receiver 1'],
          "name": "sendToAccount",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },

        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_ipfsHash",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_description",
              "type": "string"
            }
          ],
          "name": "setCertificate",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },

        // Dorsa : Ey jooooonam 🤤

        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_active",
              "type": "string"
            }
          ],
          "name": "setActive",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ]
).at(0xddD52D433992fa61018EC16e0434724426aC63f0)

// const contract = your_contract.at(0xddD52D433992fa61018EC16e0434724426aC63f0)

// contract.methods.

// helloWorld.methods.output().call({from: '0x8863ae48646c493efF8cd54f9Ffb8Be89669E62A'}, function(error, result) {
//     console.log(result);
// });


















