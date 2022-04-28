import React, { FC, ReactNode } from 'react';
import ApolloCardHeader from './ApolloCardHeader';
import ApolloCardBody from './ApolloCardBody';
import ExternalLinkIcon from './icons/ExternalLinkIcon';
import Grid from '@mui/material/Grid';
import { white60, borderGrey } from '../theme/mui-theme';

type Props = {};

const MyxAstroTableHeader: FC<Props> = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        p: '12px 24px',
        color: white60,
        fontSize: '12px',
        lineHeight: '16px',
        borderBottom: '2px solid',
        borderColor: borderGrey
      }}>
      <Grid item md>
        Asset
      </Grid>
      <Grid item md>
        In Lockdrop
      </Grid>
      <Grid item md>
        In Wallet
      </Grid>
      <Grid item md={4} textAlign="right">
        Actions
      </Grid>
    </Grid>
  );
};

export default MyxAstroTableHeader;
