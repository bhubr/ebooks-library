import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OAuth2Login from 'react-simple-oauth2-login';
import { postCode } from './helpers/api';

const authUrl = 'https://github.com/login/oauth/authorize';
const redirectUri = process.env.REACT_APP_REDIRECT_URI;
const clientId = process.env.REACT_APP_CLIENT_ID;

const githubApiUrl = 'https://api.github.com';

interface User {
  id: number;
  // githubId: number;
  login: string;
  avatar_url: string;
}

const getConnectedUser = (accessToken: string) => axios.get(
  `${githubApiUrl}/user`,
  {
    headers: {
      authorization: `Bearer ${accessToken}`
    }
  }
)
  .then(res => res.data);

function App() {
  const [token, setToken] = useState<string>('');
  const [error, setError] = useState<Error|null>(null);
  const [user, setUser] = useState<User|null>(null);

  useEffect(() => {
    if (token) {
      getConnectedUser(token)
        .then(setUser)
        .catch(setError);
    }
  }, [token]);
  
  const onSuccess = ({ code }: { code: string }) => postCode(code)
    .then(({ accessToken: at }: { accessToken: string }) => setToken(at))
    // If an error occurs when sending code to server,
    // we want to display it
    .catch((error: Error) => setError(error));
  
  if (error) {
    return <p style={{
      padding: '1em',
      border: '2px solid red'
    }}>{error.message}</p>
  }
  if (!token) {
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
      <p>Access token: {token}</p>
      {
        user && (
          <div>
            <p>login: <strong>{user.login}</strong></p>
            <img
              src={user.avatar_url}
              alt={`${user.login}'s avatar`}
            />
          </div>
        )
      }
    </div>
  );
}

export default App;
