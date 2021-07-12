import { fetcher } from './fetcher';
import { Endpoints } from './apiUrls';
import { User } from './user';
import { parseToNumber } from '../utils/parse-to-number';

const TOTAL_COUNT_HEADER_NAME = 'X-Total-Count';

export const getUsers = async (page: number) => {
  const { data, headers } = await fetcher<User[]>(Endpoints.users(page));
  const header = headers.get(TOTAL_COUNT_HEADER_NAME);
  const totalCount = parseToNumber(header) ?? 0;
  return { users: data, totalCount };
};
