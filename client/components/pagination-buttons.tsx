import { FC } from 'react';
import { Box, Button, Grid } from '@material-ui/core';

interface PaginationButtonsProps {
  setPage: (nextPage: number) => void;
  page: number;
}

export const PaginationButtons: FC<PaginationButtonsProps> = ({
  setPage,
  page,
}) => {
  return (
    <Grid container justifyContent="center">
      <Box m={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setPage(page - 1)}
        >
          Go back
        </Button>
      </Box>
      <Box m={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setPage(page + 1)}
        >
          Go next
        </Button>
      </Box>
    </Grid>
  );
};
