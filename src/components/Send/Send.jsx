import React,{ useState } from 'react';
import { ethers } from 'ethers';

function Send(props) {

    const [error, SetError] = useState("");
    const [ errorStyle, SetErrorStyle ] = useState({});

    function TransferAtoms(event) {
        event.preventDefault();

        SetError("connecting...");
        SetErrorStyle({color : "white"});

        let atoms = Number(event.target.amount.value);
        let value = atoms * 1000;

        let toAddress = event.target.toAddress.value;

        props.transfer(toAddress, value)
            .then(() => {
                SetError("Transaction successfull...!!!");
                SetErrorStyle({color : "green"});
            });
    }

    return (
        <div className="send-body">

            <a onClick={props.switch}>
                <img src="../../images/goback.png" alt="back" />
            </a>

            <center className="send-area">
                <form onSubmit={TransferAtoms}>
                    <input id="toAddress" type="text" placeholder="Adress to send Atoms" />
                    <br/>
                    <input id="amount" type="number" placeholder="Number of Atoms" required min="0.01" step="0.001"/>
                    <br/>
                    <button type="submit">
                        Send Atoms
                    </button>
                </form>
                <p style={errorStyle}> {error} </p>
            </center>

        </div>
    );
}

export default Send;