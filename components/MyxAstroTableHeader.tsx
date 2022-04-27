import React, { FC, ReactNode } from 'react';
import ApolloCardHeader from './ApolloCardHeader';
import ApolloCardBody from './ApolloCardBody';
import ExternalLinkIcon from './icons/ExternalLinkIcon';
import Grid from '@mui/material/Grid';
import { almostWhite } from '../theme/mui-theme';

type Props = {};

const MyxAstroTableHeader: FC<Props> = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        p: '4px 8px',
        color: almostWhite
      }}>
      <Grid item>Asset</Grid>
      <Grid item>In Lockdrop</Grid>
      <Grid item>In Wallet</Grid>
      <Grid item>Actions</Grid>
    </Grid>
  );
};

export default MyxAstroTableHeader;
