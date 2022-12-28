import React, { useState } from 'react';

function Nav() {

    const [connectionStatus, SetConnectionStatus] = useState("no connection");

    function IsUserConnected() {

        chrome.storage.local.get(["atomKey"]).then((result) => {
            if(result.atomKey !== undefined && result.atomKey != "")
            {
                SetConnectionStatus("connected");
            }
        });

    }
    IsUserConnected();

    return (
        <div className="nav">
            <img src="../../images/icon64.png" alt="Logo" />
            <button>
                <input checked={connectionStatus == "connected"} type="radio" readonly/>
                <p>{connectionStatus}</p>
            </button>
        </div>
    );
}

export default Nav;