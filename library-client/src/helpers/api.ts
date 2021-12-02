import axios from 'axios';
import { User } from '../types';

const serverOrigin = process.env.REACT_APP_SERVER_ORIGIN;
const instance = axios.create({
  baseURL: `${serverOrigin}/api`
})

export async function postCode(code: string): Promise<User> {
  return instance.post('/oauth/token', {
    code
  },
  {
    withCredentials: true,
  })
    .then(res => res.data);
}

export async function getConnectedUser() {
  return instance.get(
    `/auth/user`,
    {
      withCredentials: true,
    }
  )
    .then(res => res.data);
}
