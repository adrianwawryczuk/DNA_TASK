import { API_LIMIT, SERVER_URL } from '../env';

export const Endpoints = {
  users: (page: number) =>
    `${SERVER_URL}/users?_limit=${API_LIMIT}&_page=${page}`,
  user: (username: string) => `${SERVER_URL}/users?username=${username}`,
};
