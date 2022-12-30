import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

function Body(props) {

    const [ contract, SetContract ] = useState("");
    const [ ownerWallet, SetOwnerWallet ] = useState("");
    const [ balance, SetBalance ] = useState(0);

    useEffect(() => {
        console.log("running");
        props.connect();
    },[]);

    function OpenFaucet() {
        chrome.tabs.create({
            url: 'https://atom-faucet.onrender.com/'
        });      
    }

    return (
        <center>
            <h2>Atom wallet</h2>

            <p className="user-address">
                {props.address}
            </p>

            <p className="amount">
                {props.balance} <span> AM</span>
            </p>

            <p className="conversion">
                1 AM = 0.1 ETH
            </p>

            <div className="links-container">
                <a className="inter-links" onClick={OpenFaucet}>
                    <img src="../../images/faucet.png" alt="faucet" />
                    <p>Get atoms</p>
                </a>

                <a onClick={props.switch} className="inter-links">
                    <img style={{transform: 'rotate(40deg)'}} src="../../images/send.png" alt="send" />
                    <p>Send atoms</p>
                </a>

                {/* <a className="inter-links" href="./link">
                    <img src="../../images/faucet.png" alt="faucet" />
                    <p>Get atoms</p>
                </a> */}
            </div>

        </center>
    );
}

export default Body;