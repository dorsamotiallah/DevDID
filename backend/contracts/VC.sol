pragma solidity ^0.8.10;

interface VC {
    

    struct VerifiableCredentialMetadata {
        string [] Context ;
        string id;
        string [] types;
        string Issuer;
        string issuanceDate;
                    

    }

    struct VerifiableCredentialClaim {
       string data; // JSON Claims (Front-end Pure)
                    

    }

    struct VerifiableCredentialSubject {
        string id;
        VerifiableCredentialClaim [] Claims;
                    

    }

    struct VerifiableCredentialProof {
        string proofType;
        string Created;//Creation time and date
        string proofPurpose ; 
        string verificationMethod ; //Can verify signature (a URI verifies using public key)
        string jws; //Signature value

    }
    
} 