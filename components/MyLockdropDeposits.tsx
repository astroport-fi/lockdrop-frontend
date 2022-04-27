import React, { FC, ReactNode } from 'react';
import { Box, Flex, Link, Spacer, VStack } from '@chakra-ui/react';
import ApolloCardHeader from './ApolloCardHeader';
import ApolloCardBody from './ApolloCardBody';
import ExternalLinkIcon from './icons/ExternalLinkIcon';
import MyLockdropDepositsHeader from './MyLockdropDepositsHeader';
import MyLockdropDepositsRow from './MyLockdropDepositsRow';
import Container from '@mui/material/Container';
import WidgetContainer from './WidgetContainer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { almostWhite } from '../theme/mui-theme';
import Grid from '@mui/material/Grid';

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

const MyLockdropDeposits: FC<Props> = () => {
  return (
    <WidgetContainer
      title="My Lockdrop Deposits"
      titleFontVariant="body2"
      padding={0}
      linkText="Learn more"
      linkUrl="#"
      style={{ width: '100%' }}>
      <Stack>
        <MyLockdropDepositsHeader />
        {deposits.map((deposit: any, i: number) => {
          const { amount, unlocksOn, rewards, percentOfRewards } = deposit;
          return (
            <MyLockdropDepositsRow
              key={'row-' + i}
              amount={amount}
              unlocksOn={unlocksOn}
              rewards={rewards}
              percentOfRewards={percentOfRewards}
            />
          );
        })}
      </Stack>
    </WidgetContainer>
  );
};

export default MyLockdropDeposits;
