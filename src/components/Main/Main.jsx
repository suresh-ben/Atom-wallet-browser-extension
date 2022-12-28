import React, { useState } from 'react';
import { ethers } from 'ethers';

import Start from '../Start/Start.jsx';
import Body from '../Body/Body.jsx';
import Send from '../Send/Send.jsx';

function Main() {
    /**
     * @dev
     * false - body
     * true - send
     */
    const [ switcher, SetSwitcher ] = useState(false);
    const [ isLogged, SetIsLogged ] = useState("false");

    
    
    function LoadUserDetails() {
        chrome.storage.local.get(["atomKey"]).then((result) => {
            if(result.atomKey === undefined || result.atomKey == "")
                SetIsLogged(false);
            else
            {
                console.log("Key is : " + result.atomKey);
                SetIsLogged(true);
            }
        });
    }
    LoadUserDetails();

    function UpdateSwitcher() {
        if(switcher) 
            SetSwitcher(false);
        else
            SetSwitcher(true);
    }

    //conection to contract 
    // async function connectToAtom() {
        
    //     //network provider -- sepolia network
    //     let url = "https://rpc.sepolia.org/";
    //     const provider = new ethers.providers.JsonRpcProvider(url);
        
    //     let atomKey;
    //     chrome.storage.local.get(["atomKey"]).then((result) => {
    //         if(result.atomKey !== undefined && result.atomKey != "")
    //             atomKey = result.atomKey;
    //     });
    //     //wallet to pay gas fee
    //     const wallet = new ethers.Wallet(atomKey, provider);
        
    //     //contract abi
    //     const abi = "Atom_abi";

    //     //coneccting
    //     let signer = provider.getSigner();
    //     var contract = await new ethers.Contract("0x2eBD9a4E16b7dE2Af9cAC774D1E08087091093D2", abi, signer);
    //     await contract.connect(wallet);

    //     return contract;
    // }

    let atom_contract;

    // chrome.storage.local.get(["atomKey"]).then((result) => {
    //     if(result.atomKey !== undefined && result.atomKey != "")
    //      {
    //         connectToAtom()
    //             .then((contract) => {
    //                 atom_contract = contract;
    //                 console.log(atom_contract.address);
    //             });
    //      }
    // });


    return (

        <div className="main-body">

            {
                isLogged ? (
                    switcher ? ( <Send contract={atom_contract} switch = {UpdateSwitcher} /> ) : ( <Body contract={atom_contract} switch = {UpdateSwitcher} /> )
                ) :
                <Start logSwitch={LoadUserDetails} />
            }
        </div>

    );
}

export default Main;