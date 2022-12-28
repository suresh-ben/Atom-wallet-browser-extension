import React from 'react';
import { ethers } from 'ethers';

function Body(props) {
    return (
        <center>
            <h2>Atom wallet</h2>

            <p className="amount">
                10 <span> AM</span>
            </p>

            <p className="conversion">
                1 AM = 0.1 ETH
            </p>

            <div className="links-container">
                <a className="inter-links" href="./link">
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