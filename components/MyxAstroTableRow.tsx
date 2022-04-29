import React, { FC, useState } from 'react';
import ApolloCardHeader from './ApolloCardHeader';
import ApolloCardBody from './ApolloCardBody';
import ExternalLinkIcon from './icons/ExternalLinkIcon';
import Grid from '@mui/material/Grid';
import {
  white95,
  almostBlack,
  gold,
  buttonGrey,
  borderGrey,
  white5
} from '../theme/mui-theme';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Button from './Button';
import xAstroIcon from './icons/xAstroIcon';
import ApolloFormattedStatistic from './ApolloFormattedStatistic';
import LockAstroModal from 'components/modals/LockAstroModal';

type Props = {
  icon: any;
  name: any;
  amount: number;
  inWallet: number;
};

const MyxAstroTableRow: FC<Props> = ({
  icon,
  name,
  amount,
  inWallet
}: Props) => {
  // todo
  const [openLockModal, setOpenLockModal] = useState(false);
  const handleLockxAstro = () => {
    setOpenLockModal(true);
  };

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      direction="row"
      sx={{
        p: 3,
        color: white95,
        fontSize: '15px',
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
      <LockAstroModal
        isOpen={openLockModal}
        onClose={() => setOpenLockModal(false)}
      />
      <Grid item md container direction="row" justifyContent="flex-start">
        <Grid item sx={{ marginRight: '8px' }}>
          <Image src={icon} width={20} height={20} alt="xAstro Icon" />
        </Grid>
        <Grid item>
          <Typography
            sx={{ fontSize: '15px', fontWeight: 500 }}
            color={white95}>
            {name}
          </Typography>
        </Grid>
      </Grid>
      <Grid item md>
        <ApolloFormattedStatistic
          value={amount}
          decimals={2}
          decimalsInGrey={true}
        />
      </Grid>
      <Grid item md>
        <ApolloFormattedStatistic
          value={inWallet}
          decimals={2}
          decimalsInGrey={true}
        />
      </Grid>
      <Grid item md={4} textAlign="right">
        <Button
          backgroundColor={gold}
          color={almostBlack}
          backgroundHoverColor={buttonGrey}
          hoverColor={white95}
          label="Lock xASTRO"
          onClick={handleLockxAstro}
        />
      </Grid>
    </Grid>
  );
};

export default MyxAstroTableRow;
