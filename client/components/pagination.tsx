import { FC, ReactNode, useCallback, useMemo, useState } from 'react';
import { Grid } from '@material-ui/core';
import { API_LIMIT } from '../env';
import { useRouter } from 'next/router';

interface PaginationChildrenProps {
  setPage: (newPage: number) => void;
  page: number;
}
interface PaginationProps {
  children: (args: PaginationChildrenProps) => ReactNode;
  totalCount: number;
  initialPage?: number;
}

export const Pagination: FC<PaginationProps> = ({
  children,
  totalCount,
  initialPage,
}) => {
  const router = useRouter();
  const [page, setPage] = useState(initialPage ?? 1);

  const getNewPage = useCallback(
    (newPage: number) => {
      if (newPage <= 1) {
        return 1;
      }

      if (newPage * API_LIMIT >= totalCount) {
        return totalCount / API_LIMIT;
      }

      return newPage;
    },
    [totalCount]
  );

  const childrenProps: PaginationChildrenProps = useMemo(() => {
    return {
      page,
      setPage: (newPage: number) => {
        router.replace('/', undefined, { shallow: true });
        setPage(getNewPage(newPage));
      },
    };
  }, [page, setPage, getNewPage]);

  return (
    <Grid container direction="column" justifyContent="center">
      {children(childrenProps)}
    </Grid>
  );
};
