import { FC } from 'react';
import { Box, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import { User } from '../api';

interface UserDetailsProps {
  user: User;
}

const classes = makeStyles(() => ({
  divider: {
    height: 1,
    width: '100%',
  },
}));

export const UserDetails: FC<UserDetailsProps> = (props) => {
  const styles = classes();

  return (
    <>
      {Object.entries(props.user).map(([key, value]) => (
        <Box m={1} key={key}>
          <Grid container alignItems="center">
            <Typography>{key}</Typography>:{' '}
            <Box ml={1}>{JSON.stringify(value)}</Box>
            <Divider className={styles.divider} flexItem variant="fullWidth" />
          </Grid>
        </Box>
      ))}
    </>
  );
};
