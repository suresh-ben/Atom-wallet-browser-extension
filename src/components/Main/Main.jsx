import React, { useState } from 'react';
import { ethers } from 'ethers';

import Start from '../Start/Start.jsx';
import Body from '../Body/Body.jsx';
import Send from '../Send/Send.jsx';
import Atom_abi from './atom_erc20.jsx'

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
                SetIsLogged(true);
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
    const [ atom_contract, SetAtomContract ] = useState("");
    const [ ownerWallet, SetOwnerWallet ] = useState("");
    const [ ownerBalance, SetOwnerBalance ] = useState(0);
    const [ ownerAddress, SetOwnerAddress ] = useState("");

    async function connectToAtom() {
        
        //network provider -- sepolia network
        let url = "https://rpc.sepolia.org/";
        const provider = new ethers.providers.JsonRpcProvider(url);
        
        let atomKey;
        await chrome.storage.local.get(["atomKey"]).then((result) => {
            if(result.atomKey !== undefined)
                atomKey = result.atomKey;
        });

        const signer = new ethers.Wallet(atomKey, provider);

        //wallet to pay gas fee
        const wallet = new ethers.Wallet(atomKey, provider);
        SetOwnerWallet(wallet);
        SetOwnerAddress(wallet.address);
        
        //contract abi
        const abi = Atom_abi;

        var contract = await new ethers.Contract("0x2eBD9a4E16b7dE2Af9cAC774D1E08087091093D2", abi, signer);
        SetAtomContract(contract);

        return contract;
    }

    async function UpdateBalance() {

        let tempKey = "";
        await chrome.storage.local.get(["atomKey"]).then((result) => {
            if(result.atomKey !== undefined && result.atomKey != "")
                tempKey = result.atomKey;
        });
        if(tempKey == "") return {};

        //work -- here

        let tempContract = await connectToAtom();
        let tempAddress = (ownerWallet.address) + "";

        let tempBalance = await tempContract.balanceOf("0x0466c4e4e648aE045bb5882734Ab2B14EF2f03eF");
        tempBalance = tempBalance.toString();
        console.log("str : " + tempBalance);

        tempBalance = Number(tempBalance);
        console.log("num : " + tempBalance);

        tempBalance = tempBalance* 1.000 / 1000;
        console.log("balance : " + tempBalance);
        SetOwnerBalance(tempBalance);
    }

    async function TransferAtoms(toAddress, value) {
        let tempKey = "";
        await chrome.storage.local.get(["atomKey"]).then((result) => {
            if(result.atomKey !== undefined && result.atomKey != "")
                tempKey = result.atomKey;
        });
        if(tempKey == "") return {};
        console.log("called");

        //work -- here
        let tempContract = await connectToAtom();
        console.log(tempContract);

        await tempContract.transfer(toAddress, value);
        
        return true;
    }

    //---- connection functions done ---

    return (

        <div className="main-body">

            {
                isLogged ? (
                    switcher ? ( <Send transfer={TransferAtoms} switch = {UpdateSwitcher} /> ) : ( <Body address={ownerAddress} balance={ownerBalance} connect={UpdateBalance} switch = {UpdateSwitcher} /> )
                ) :
                <Start logSwitch={LoadUserDetails} />
            }
        </div>

    );
}

export default Main;