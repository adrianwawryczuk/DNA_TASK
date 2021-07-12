import { fetcher } from './fetcher';
import { Endpoints } from './apiUrls';

export interface User {
  name: string;
  username: string;
  email: string;
}

export const getUser = async (email: string) => {
  const { data } = await fetcher<User[]>(Endpoints.user(email));

  return data.length ? data[0] : null;
};
