import axios from 'axios';

const serverOrigin = process.env.REACT_APP_SERVER_ORIGIN;
const instance = axios.create({
  baseURL: `${serverOrigin}/api`
})

type AccessTokenPayload = {
  accessToken: string;
}

export async function postCode(code: string): Promise<AccessTokenPayload> {
  return instance.post('/oauth/token', {
    code
  })
    .then(res => res.data);
}

