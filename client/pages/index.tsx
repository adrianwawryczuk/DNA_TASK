import { GetServerSideProps } from 'next';
import { FC, useRef } from 'react';
import { getUsers } from '../api';
import { UsersList } from '../components/users-list';
import { Box } from '@material-ui/core';
import { User } from '../api';
import { PaginationButtons } from '../components/pagination-buttons';
import { Pagination } from '../components/pagination';
import { parseToNumber } from '../utils/parse-to-number';

interface HomeProps {
  users: User[];
  totalCount: number;
  query: HomePageQuery;
}

interface HomePageQuery extends NodeJS.Dict<string | string[]> {
  page?: string;
  email?: string;
}

const parsePageQuery = (value: unknown): number => parseToNumber(value) ?? 1;

export const getServerSideProps: GetServerSideProps<HomeProps, HomePageQuery> =
  async (context) => {
    const query = context.query;
    const { totalCount, users } = await getUsers(parsePageQuery(query.page));
    return { props: { users, totalCount, query } };
  };

const Home: FC<HomeProps> = (props) => {
  const pageQuery = useRef(parsePageQuery(props.query.page));

  return (
    <Box m={2}>
      <Pagination totalCount={props.totalCount} initialPage={pageQuery.current}>
        {({ page, setPage }) => (
          <>
            <PaginationButtons setPage={setPage} page={page} />
            <UsersList
              initialUsers={props.users}
              initialPage={pageQuery.current}
              page={page}
              selectedUserEmail={props.query.email}
            />
          </>
        )}
      </Pagination>
    </Box>
  );
};

export default Home;
