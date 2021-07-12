import { Grid } from '@material-ui/core';
import { FC } from 'react';
import { GetServerSideProps } from 'next';
import { getUser, User } from '../api';
import { UserDetails } from '../components/user-details';
import { GoToListLink } from '../components/go-to-list-link';

interface PageQuery extends NodeJS.Dict<string | string[]> {
  username: string;
}

interface UserPageProps {
  user: User | null;
  query: {
    email?: string;
    page?: string;
  };
}

export const getServerSideProps: GetServerSideProps<UserPageProps, PageQuery> =
  async (context) => {
    const user = await getUser(context.params!.username as string);
    return { props: { user, query: context.query } };
  };

const UserPage: FC<UserPageProps> = (props) => {
  if (!props.user) {
    return null;
  }

  return (
    <Grid container direction="column">
      <GoToListLink
        emailQuery={props.query.email}
        pageQuery={props.query.page}
      />

      <UserDetails user={props.user} />
    </Grid>
  );
};

export default UserPage;
