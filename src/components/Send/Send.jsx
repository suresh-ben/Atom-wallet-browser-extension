import React,{ useState } from 'react';
import { ethers } from 'ethers';

function Send(props) {

    const [error, SetError] = useState("this is error");

    return (
        <div className="send-body">

            <a onClick={props.switch}>
                <img src="../../images/back.png" alt="send" />
            </a>

            <center className="send-area">
                <form>
                    <input type="text" placeholder="Adress to send Atoms" />
                    <br/>
                    <input type="number" placeholder="Number of Atoms" />
                    <br/>
                    <button>
                        Send Atoms
                    </button>
                </form>
                <p style={{color: "red"}}>{error}</p>
            </center>

        </div>
    );
}

export default Send;