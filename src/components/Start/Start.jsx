import React from "react";

function Start(props) {

    function LogUser(event) {
        event.preventDefault();

        let value = event.target.atomKey.value;

        chrome.storage.local.set({ atomKey : value }).then(() => {
            console.log("private key is set to " + value);
        });

        props.logSwitch()
    }

    return (
        <center className="start-body">

            <h2>
                Atom wallet
            </h2>

            <form action="" onSubmit={LogUser}>

                <input type="text" id="atomKey" placeholder="Enter Number the Private key" />
                <br/>
                <button type={"submit"}>
                    connect to wallet
                </button>

            </form>

        </center>
    );
}

export default Start;