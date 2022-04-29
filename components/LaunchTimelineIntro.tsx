import React from 'react';
import dayjs from 'dayjs';
import { Box } from '@chakra-ui/react';
import { Grid, useMediaQuery, useTheme } from '@mui/material';

import { useAstroApp } from 'modules/common';

import DateNumber from 'components/DateNumber';
import CardHeader from 'components/CardHeader';
import Card from 'components/Card';
import ApolloStageIndicator from './ApolloStageIndicator';

const LaunchTimelineIntro = () => {
  const { phase1StartDate, phase2StartDate } = useAstroApp();
  const endDate = phase1StartDate?.add(14, 'day');
  const startPhase1Date = phase1StartDate?.format('MMM/DD/YY');
  const startPhase2Date = phase2StartDate?.format('MMM/DD/YY');
  const formattedEndDate = endDate?.format('MMM/DD/YY');

  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('md'));

  function checkToday(index) {
    const today = dayjs.utc().tz('Europe/London');
    return endDate?.subtract(index, 'days').isSame(today, 'day');
  }

  function printDate(phaseNumber, start, end) {
    const phase = [];

    for (let index = start; index > end; index--) {
      let isToday = checkToday(index);
      if (phaseNumber == 1 && index < 10) {
        phase.push(
          <DateNumber
            day={index}
            bg="brand.purple"
            color="white"
            isToday={isToday}
          />
        );
      } else if (phaseNumber == 2 && index < 3) {
        phase.push(<DateNumber day={index} bg="#83FFCB" isToday={isToday} />);
      } else {
        phase.push(<DateNumber day={index} isToday={isToday} />);
      }
    }
    return phase;
  }

  const phase1 = printDate(1, 14, 7);
  const phase2 = printDate(2, 7, 0);

  return (
    <Box className="panel">
      <Box p="15px">
        <h6 className="color-secondary">
          Information - Wallet Address: {address}
        </h6>
      </Box>

      <Box h="1px" className="border" />
      <Grid container>
        <Grid item xs={12} sm={12} md={6}>
          <Box flex="2" p="15px">
            <p className="color-primary weight-600">Title Goes Here</p>
            <p className="color-secondary">
              Description text about the Lockdrop and any other relevant
              information is shown here, explaining to users why Apollo DAO is
              holding the xASTRO Lockdrop event, what the xASTRO will be used
              for, etc.
            </p>
            <br />
            <p className="color-secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <br />
            <p className="color-secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <br />
            <p className="color-primary weight-600">More Info</p>
            <p className="color-secondary">
              For more info on the lockdrop, read this{' '}
              <a
                className="color-link"
                href="https://medium.com"
                target="_blank"
                rel="noreferrer">
                article
              </a>
            </p>
          </Box>
        </Grid>
        <Grid item container xs={12} sm={12} md={6}>
          {!isMobile && <Box w="1px" className="border" />}
          <Box flex="2" p="15px">
            <Box display="flex" alignItems="center">
              <Box mr="8px">
                <caption className="color-primary">DAYS</caption>
              </Box>
              <ApolloStageIndicator />
            </Box>
            <Box mt="16px">
              <p className="color-primary weight-600">Here’s how it works</p>
              <p className="color-secondary">
                You can “lock” up your xASTRO for a fixed duration up to 12
                months. In exchange, you’ll receive a “drop” of APOLLO tokens
                which will be linearly vested over 1 year starting after the
                completion of the Lockdrop. The more xASTRO and the longer you
                lock up, the more APOLLO tokens you’ll receive.
              </p>
              <br />
              <p className="color-primary weight-600">Stage 1</p>
              <p className="color-secondary">
                During Stage 1 (Day 1-5) there are no limit on deposits and
                withdrawals of xASTRO. Once Stage 2 (Day 6) begins you will only
                be able to withdraw xASTRO.
              </p>
              <br />
              <p className="color-primary weight-600">Stage 2</p>
              <p className="color-secondary">
                Starting from day 6, you will only be able to withdraw up to 50%
                of your xASTRO deposits. On day 7, withdrawal allowance will
                fall linearly from 50% to 0%.
              </p>
              <br />
              <p className="color-primary weight-600">Here’s how it works</p>
              <p className="color-secondary">
                Locked up xASTRO will be deposited into the apASTRO vault which
                will auto-compound your position throughout the lock period.
                When your lock expires, you will be able to withdraw apASTRO
                (can be traded for xASTRO or held for continued rewards).
              </p>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LaunchTimelineIntro;
