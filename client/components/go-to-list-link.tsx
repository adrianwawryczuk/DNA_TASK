import { FC } from 'react';
import { Box } from '@material-ui/core';
import { Link } from './link';
import { parseToNumber } from '../utils/parse-to-number';

interface GoToListLinkProps {
  emailQuery?: string;
  pageQuery?: string;
}

export const GoToListLink: FC<GoToListLinkProps> = (props) => {
  const goBackPage = parseToNumber(props.pageQuery);

  return (
    <>
      {goBackPage && props.emailQuery ? (
        <Box m={1}>
          <Link to={`/?page=${goBackPage}&email=${props.emailQuery}`}>
            Go back
          </Link>
        </Box>
      ) : null}
    </>
  );
};
