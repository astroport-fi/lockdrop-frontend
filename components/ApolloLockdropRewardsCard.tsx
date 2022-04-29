import React, { Component } from 'react';
import { Avatar, Flex, Spinner } from '@chakra-ui/react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {
  white95,
  almostBlack,
  white60,
  borderGrey,
  orangeGoldGradientHorz
} from '../theme/mui-theme';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import apolloIcon from '../public/apollo.svg';
import Image from 'next/image';
import ApolloFormattedStatistic from './ApolloFormattedStatistic';

type Props = {
  amount: number;
};

const useStyles: any = makeStyles((theme: Theme) => ({
  gradientContainer: {
    position: 'relative',
    zIndex: 1,
    overflow: 'visible',
    background: almostBlack,
    borderRadius: '12px',
    width: '100%'
  },
  gradientBackground: {
    fontSize: '30px',
    letterSpacing: '0.1rem',
    fontWeight: 500,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: orangeGoldGradientHorz,
    zIndex: -1,

    filter: 'blur(10px)'
  }
}));

const ApolloLockdropRewardsCard = ({ amount = 100000 }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center">
      <Grid item className={classes.gradientContainer}>
        <Box
          sx={{
            borderBottom: '1px solid',
            borderColor: borderGrey,
            borderTopRightRadius: '12px',
            borderTopLeftRadius: '12px',
            padding: '12px',
            background: almostBlack
          }}>
          <Typography
            variant="body2"
            sx={{ fontSize: '12px', lineHeight: '16px' }}
            color={white95}>
            MY EST. APOLLO REWARDS
          </Typography>
        </Box>
        <Box
          sx={{
            background: almostBlack,
            minWidth: '200px',
            padding: '24px 12px',
            borderBottomRightRadius: '12px',
            borderBottomLeftRadius: '12px'
          }}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            spacing={2}
            alignItems="flexEnd">
            <Grid item>
              <Image
                src={apolloIcon}
                width={30}
                height={30}
                alt="Apollo Icon"
              />
            </Grid>
            <Grid item>
              <ApolloFormattedStatistic
                value={100000}
                decimals={2}
                fontSize="26px"
              />
            </Grid>
          </Grid>
        </Box>
        <Box
          style={{
            animation: 'pulsate 3s ease-in-out infinite alternate'
          }}
          className={classes.gradientBackground}
        />
      </Grid>
    </Grid>
  );
};

export default ApolloLockdropRewardsCard;
