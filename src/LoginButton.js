import React from 'react';
import {GoogleLogin} from  'react-google-login';

const clientId = '594033697275-aea1ee17durj6nbv9je4gg462rmqehie.apps.googleusercontent.com';

function LoginButton({onSuccessCallback, onFailureCallback}) {

    const onSuccess = (res) => {

        console.log("Login success, current user: ", res.profileObj);
        onSuccessCallback(res);

    }

    const onFailure = (res) => {

        console.log("Login failed, res: ", res);
        onFailureCallback(res);

    }

    return (

        <div className="signInButton">
            <GoogleLogin
                clientId = {clientId}
                buttonText = "Login"
                onSuccess = {onSuccess}
                onFailure = {onFailure}
                cookiePolicy = {"single_host_origin"}
                isSignedIn = {true}
            />
        </div>

    )

}

export default LoginButton;