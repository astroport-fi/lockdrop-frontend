import React, { FC, ReactNode } from 'react';
import {
  Box,
  Flex,
  HStack,
  Link,
  Spacer,
  Stack,
  VStack
} from '@chakra-ui/react';
import ApolloCardHeader from './ApolloCardHeader';
import ApolloCardBody from './ApolloCardBody';
import ExternalLinkIcon from './icons/ExternalLinkIcon';
import Grid from '@mui/material/Grid';
import { white60, borderGrey } from '../theme/mui-theme';

type Props = {};

const deposits = [
  {
    amount: 15000,
    unlocksOn: '2023-04-06T00:00:00.000Z',
    rewards: 75000,
    percentOfRewards: 0.7
  },
  {
    amount: 5000,
    unlocksOn: '2022-06-06T00:00:00.000Z',
    rewards: 55000,
    percentOfRewards: 0.25
  }
];

const MyLockdropDepositsHeader: FC<Props> = () => {
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
        xASTRO Locked
      </Grid>
      <Grid item md>
        Fully Unlocks On
      </Grid>
      <Grid item md>
        Est. APOLLO Rewards
      </Grid>
      <Grid item md>
        Est. % of Lockdrop Rewards
      </Grid>
      <Grid item md={3} textAlign="right">
        Actions
      </Grid>
    </Grid>
  );
};

export default MyLockdropDepositsHeader;
