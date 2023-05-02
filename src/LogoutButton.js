import React from 'react'
import {GoogleLogin} from  'react-google-login';

const clientId = '594033697275-aea1ee17durj6nbv9je4gg462rmqehie.apps.googleusercontent.com';

function LogoutButton({onSuccessCallback}) {

    const onSuccess = (res) => {

        console.log("Login success, current user: ", res.profileObj);
        onSuccessCallback(res);

    }

    return (

        <div className="signInButton">
            <GoogleLogin
                clientId = {clientId}
                buttonText = "Logout"
                onLogoutSuccess = {onSuccess}
            />
        </div>

    )

}

export default LogoutButton;