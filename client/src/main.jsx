import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import Central from './contexts/Central';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense>
        <Central>
          <Auth0Provider
            domain="dev-dh54w48gok42komr.us.auth0.com"
            clientId="AlJmSXRtopg3H7gBzrxC0B9pmOuqWI5A"
            authorizationParams={{
              redirect_uri: 'http://localhost:5173/',
            }}
          >
            <App />
          </Auth0Provider>
        </Central>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
