import React, { useState, useEffect } from 'react';
import OAuth2Login from 'react-simple-oauth2-login';
import { postCode, getConnectedUser } from './helpers/api';
import { User } from './types';

const authUrl = 'https://github.com/login/oauth/authorize';
const redirectUri = process.env.REACT_APP_REDIRECT_URI;
const clientId = process.env.REACT_APP_CLIENT_ID;

function App() {
  const [error, setError] = useState<Error|null>(null);
  const [user, setUser] = useState<User|null>(null);

  useEffect(() => {
    getConnectedUser()
      .then(setUser)
      .catch(setError);
  }, []);
  
  const onSuccess = ({ code }: { code: string }) => postCode(code)
    .then(user => setUser(user))
    // If an error occurs when sending code to server,
    // we want to display it
    .catch((error: Error) => setError(error));
  
  if (!user) {
    return (
      <OAuth2Login
        responseType="code"
        authorizationUrl={authUrl}
        redirectUri={redirectUri}
        clientId={clientId}
        onSuccess={onSuccess}
      />
    );
  }
  return (
    <div>
      {
        error && (
          <p style={{
            padding: '1em',
            border: '2px solid red'
          }}>{error.message}</p>
        )
      }
      {
        user && (
          <div>
            <p>login: <strong>{user.login}</strong></p>
            <img
              src={user.avatarUrl}
              alt={`${user.login}'s avatar`}
            />
          </div>
        )
      }
    </div>
  );
}

export default App;
