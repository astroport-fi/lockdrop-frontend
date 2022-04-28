import React, { FC, ReactNode } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import Typography from '@mui/material/Typography';
import Countdown from 'react-countdown';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { orangeGoldGradientHorz } from '../theme/mui-theme';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

type Props = {
  children?: ReactNode;
  isRight?: boolean;
} & BoxProps;

const COUNTDOWN_DATE = new Date('2022-05-02T00:00:00.000Z');

const useStyles: any = makeStyles((theme: Theme) => ({
  countdownText: {
    fontSize: '30px',
    letterSpacing: '0.1rem',
    fontWeight: 500,
    textAlign: 'center',
    background: orangeGoldGradientHorz,
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent'
  },
  countdownLabel: {
    marginTop: '5px',
    background: 'none #828486',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': '#828282',
    fontSize: '9px',
    textAlign: 'center'
  }
}));

const ApolloCountdown: FC<Props> = ({}) => {
  const classes = useStyles();
  return (
    <Typography variant="body2" color="textPrimary">
      <Countdown
        date={COUNTDOWN_DATE}
        renderer={(props) => (
          <>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="bottom"
              spacing={0.5}
              className={classes.countdownText}>
              <Grid item>
                <div>{props.days.toString().padStart(2, '0')}</div>
                <div className={classes.countdownLabel}>DAYS</div>
              </Grid>
              <Grid item>:</Grid>
              <Grid item>
                <div>{props.hours.toString().padStart(2, '0')}</div>
                <div className={classes.countdownLabel}>HOURS</div>
              </Grid>
              <Grid item>:</Grid>
              <Grid item>
                <div>{props.minutes.toString().padStart(2, '0')}</div>
                <div className={classes.countdownLabel}>MINUTES</div>
              </Grid>
              <Grid item>:</Grid>
              <Grid item>
                <div>{props.seconds.toString().padStart(2, '0')}</div>
                <div className={classes.countdownLabel}>SECONDS</div>
              </Grid>
            </Grid>
          </>
        )}
      />
    </Typography>
  );
};

export default ApolloCountdown;
