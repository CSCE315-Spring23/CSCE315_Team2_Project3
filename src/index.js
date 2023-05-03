import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
// import { GoogelOAuthProvider } from './GoogleOAuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <GoogelOAuthProvider clientId = {process.env.REACT_APP_OAUTH_CLIENT_ID}> */}
    <Auth0Provider
    domain="dev-prm7f6rnu4p4gpvz.us.auth0.com"
    clientId="kPkN64I1zgHH6gwFuVQvSwTo4uR8EHRp"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
      <BrowserRouter>
        <App />
      </BrowserRouter>
      {/* </GoogelOAuthProvider> */}
      </Auth0Provider>
  </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
