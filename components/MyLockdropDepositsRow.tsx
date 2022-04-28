import React, { FC, ReactNode } from 'react';
import ApolloCardHeader from './ApolloCardHeader';
import ApolloCardBody from './ApolloCardBody';
import ExternalLinkIcon from './icons/ExternalLinkIcon';
import Grid from '@mui/material/Grid';
import { borderGrey, white60, white95 } from '../theme/mui-theme';
import Button from './Button';

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
  // todo
  const handleWithdraw = () => {
    throw new Error('not implemented');
  };

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      direction="row"
      columns={10}
      sx={{
        p: 3,
        color: white95,
        fontSize: '15px',
        lineHeight: '20px',
        borderBottom: '1px solid',
        borderColor: borderGrey,
        '&:last-of-type': {
          borderBottom: 'none'
        }
      }}>
      <Grid item md={2}>
        {amount}
      </Grid>
      <Grid item md={2}>
        {new Date().toLocaleDateString()}
      </Grid>
      <Grid item md={2}>
        {rewards}
      </Grid>
      <Grid item md={2}>
        {percentOfRewards}
      </Grid>
      <Grid item md={2} textAlign="right">
        <Button label="Withdraw" onClick={handleWithdraw} />
      </Grid>
    </Grid>
  );
};

export default MyLockdropDepositsRow;
