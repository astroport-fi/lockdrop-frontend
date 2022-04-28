import React, { FC, ReactNode } from 'react';
import ApolloCardHeader from './ApolloCardHeader';
import ApolloCardBody from './ApolloCardBody';
import ExternalLinkIcon from './icons/ExternalLinkIcon';
import Grid from '@mui/material/Grid';
import { borderGrey, white5, white60, white95 } from '../theme/mui-theme';
import apolloIcon from '../public/apollo.svg';
import Button from './Button';
import Image from 'next/image';
import Typography from '@mui/material/Typography';

type Props = {
  icon: any;
  amount: any;
  unlocksOn: string;
  rewards: number;
  percentOfRewards: number;
};

const MyLockdropDepositsRow: FC<Props> = ({
  icon,
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
      justifyContent="flex-start"
      alignItems="center"
      direction="row"
      sx={{
        color: white95,
        fontSize: '15px',
        p: 3,
        lineHeight: '20px',
        borderBottom: '1px solid',
        borderColor: borderGrey,
        '&:hover': {
          backgroundColor: white5
        },
        '&:last-of-type': {
          borderBottom: 'none'
        },
        '&:hover&:last-of-type': {
          borderBottomLeftRadius: '16px',
          borderBottomRightRadius: '16px'
        }
      }}>
      <Grid item md container>
        <Grid item sx={{ marginRight: '8px' }}>
          <Image src={icon} width={20} height={20} alt="xAstro Icon" />
        </Grid>
        <Grid item>
          <Typography
            sx={{ fontSize: '15px', fontWeight: 500 }}
            color={white95}>
            {amount}
          </Typography>
        </Grid>
      </Grid>
      <Grid item md>
        {new Date(unlocksOn).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          timeZone: 'UTC'
        })}
      </Grid>
      <Grid item md container>
        <Grid item sx={{ marginRight: '8px' }}>
          <Image src={apolloIcon} width={20} height={20} alt="Apollo Icon" />
        </Grid>
        <Grid item>
          <Typography
            sx={{ fontSize: '15px', fontWeight: 500 }}
            color={white95}>
            {rewards}
          </Typography>
        </Grid>
      </Grid>
      <Grid item md>
        {percentOfRewards.toLocaleString(undefined, {
          style: 'percent',
          minimumFractionDigits: 2
        })}
      </Grid>
      <Grid item md={3} textAlign="right">
        <Button label="Withdraw" onClick={handleWithdraw} />
      </Grid>
    </Grid>
  );
};

export default MyLockdropDepositsRow;
