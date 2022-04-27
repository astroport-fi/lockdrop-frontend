import React, { FC, ReactNode } from 'react';
import {
  Box,
  Button,
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

type Props = {
  amount: any;
  unlocksOn: string;
  rewards: number;
  percentOfRewards: number;
};

const MyLockdropDepositsRow: FC<Props> = ({
  amount,
  unlocksOn,
  rewards,
  percentOfRewards
}: Props) => {
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      direction="row">
      <Grid item>{amount}</Grid>
      <Grid item>{new Date().toLocaleDateString()}</Grid>
      <Grid item>{rewards}</Grid>
      <Grid item>{percentOfRewards}</Grid>
      <Grid item>
        <Button>Withdraw</Button>
      </Grid>
    </Grid>
  );
};

export default MyLockdropDepositsRow;
