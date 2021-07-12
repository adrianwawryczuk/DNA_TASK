import NextLink from 'next/link';
import { Link as MaterialLink } from '@material-ui/core';
import { FC } from 'react';

interface LinkProps {
  to: string;
}

export const Link: FC<LinkProps> = ({ to, children }) => {
  return (
    <NextLink href={to}>
      <MaterialLink>{children}</MaterialLink>
    </NextLink>
  );
};
