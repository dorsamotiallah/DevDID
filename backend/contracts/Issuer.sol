pragma solidity ^0.8.10;
"SPDX-License-Identifier: UNLICENSED"

contract Issuer {
    address owner;
    // Save in blockchain
    // HolderAddress => Array of VC's
    string [] myVCs;
    mapping ( address => string[] ) myHoldersDICT ;
   

    // uint index = 0 ;
    // Issuer index : VC hash
    // mapping ( uint => string ) myHashes;
    

    event HashSaved (string hash , uint index ) ;
    event creation (string fuck);

      modifier onlyOwner() {
        require( msg.sender == owner, "Only the owner is allowed to access this function." );
        _;
    }

    constructor() {
        owner = msg.sender;
        emit creation("Fcuk");
    }

    function mapTheVC ( address holderAddress ,string memory hashOfVC )  public onlyOwner  {
        //append new VC hash to array belongs to holder address

        myHoldersDICT[holderAddress].push(hashOfVC); 

        // myHashes[ index ] = HashOfVC ;
        // index +=1;
        // emit HashSaved( myHashes[ index-1 ] , index-1 );
        // return 'Fuck blockchain';
        
    } 

    function getMyVCArray(address holderAddress ) public view returns( string[] memory ) {
        return myHoldersDICT[holderAddress];
    }

}