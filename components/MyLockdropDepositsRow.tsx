import React, { FC, useState } from 'react';
import ApolloCardHeader from './ApolloCardHeader';
import ApolloCardBody from './ApolloCardBody';
import ExternalLinkIcon from './icons/ExternalLinkIcon';
import Grid from '@mui/material/Grid';
import { borderGrey, white5, white60, white95 } from '../theme/mui-theme';
import apolloIcon from '../public/apollo.svg';
import Button from './Button';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import ApolloFormattedStatistic from './ApolloFormattedStatistic';
import WithdrawAstroModal from 'components/modals/WithdrawAstroModal';

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
  const [openWithdrawModal, setOpenWithdrawModal] = useState(false);

  const handleWithdraw = () => {
    setOpenWithdrawModal(true);
  };

  const daysUntilUnlock = Math.round(
    (new Date(unlocksOn).getTime() - new Date().getTime()) / (1000 * 3600 * 24)
  );

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
      {openWithdrawModal && (
        <WithdrawAstroModal
          isOpen={openWithdrawModal}
          onClose={() => setOpenWithdrawModal(false)}
        />
      )}
      <Grid item md container>
        <Grid item sx={{ marginRight: '8px' }}>
          <Image src={icon} width={20} height={20} alt="xAstro Icon" />
        </Grid>
        <Grid item>
          <Typography
            sx={{ fontSize: '15px', fontWeight: 500 }}
            color={white95}>
            <ApolloFormattedStatistic
              value={amount}
              decimals={2}
              decimalsInGrey={true}
            />
          </Typography>
        </Grid>
      </Grid>
      <Grid item md>
        <div style={{ marginBottom: '4px' }}>
          {new Date(unlocksOn).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            timeZone: 'UTC'
          })}
        </div>
        <Typography sx={{ fontSize: '14px', fontWeight: 400 }} color={white60}>
          {daysUntilUnlock} days
        </Typography>
      </Grid>
      <Grid item md container>
        <Grid item sx={{ marginRight: '8px' }}>
          <Image src={apolloIcon} width={20} height={20} alt="Apollo Icon" />
        </Grid>
        <Grid item>
          <Typography
            sx={{ fontSize: '15px', fontWeight: 500 }}
            color={white95}>
            <ApolloFormattedStatistic
              value={rewards}
              decimals={2}
              decimalsInGrey={true}
            />
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
