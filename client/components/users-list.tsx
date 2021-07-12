import { FC, useMemo } from 'react';
import { fetcher } from '../api/fetcher';
import useSWR from 'swr';
import { Endpoints } from '../api/apiUrls';
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { LinkIcon } from './link-icon';
import { Link } from './link';
import { User } from '../api';
import clsx from 'clsx';

export interface UsersListProps {
  initialUsers: User[];
  initialPage: number;
  page: number;
  selectedUserEmail?: string;
}

const makeClasses = makeStyles(() => ({
  selectedRow: {
    backgroundColor: 'beige',
  },
}));

export const UsersList: FC<UsersListProps> = (props) => {
  const classNames = makeClasses();
  const initialData =
    props.initialPage === props.page
      ? {
          data: props.initialUsers,
        }
      : undefined;

  const { data, isValidating } = useSWR<{ data: User[] }>(
    Endpoints.users(props.page),
    fetcher,
    {
      initialData,
    }
  );

  const users = isValidating || data?.data ? data?.data : props.initialUsers;
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Username</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Link</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users
          ? users.map((user) => (
              <TableRow
                key={user.email}
                className={clsx(
                  user.email === props.selectedUserEmail &&
                    classNames.selectedRow
                )}
              >
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Link
                    to={`/${user.username}?page=${props.page}&email=${user.email}`}
                  >
                    <LinkIcon />
                  </Link>
                </TableCell>
              </TableRow>
            ))
          : null}
      </TableBody>
    </Table>
  );
};
