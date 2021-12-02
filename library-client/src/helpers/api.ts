import axios from 'axios';
import { User, Book } from '../types';

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

export async function getConnectedUser(): Promise<User> {
  return instance.get(
    `/auth/user`,
    {
      withCredentials: true,
    }
  )
    .then(res => res.data);
}

export async function getBooks(): Promise<Book[]> {
  return instance.get(
    `/books`,
    {
      withCredentials: true,
    }
  )
    .then(res => res.data);
}
