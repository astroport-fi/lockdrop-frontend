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
        <h6 className="color-secondary">Information</h6>
      </Box>

      <Box h="1px" className="border" />
      <Grid container>
        <Grid item xs={12} sm={12} md={6}>
          <Box flex="2" p="15px">
            <p className="color-primary weight-600">Apollo Lockdrop</p>
            <p className="color-secondary">
              We recently released{' '}
              <a
                className="color-link"
                href="https://articles.apollo.farm/apollo-daos-convex-model-on-terra/"
                target="_blank"
                rel="noreferrer">
                our post
              </a>{' '}
              on how Apollo's Convex model will work. The benefits it will offer
              and how our primary focus will be on maintaining the apAstro
              (zxvAstro-xAstro LP) peg, while providing a high yield to users
              who stake Astro with Apollo.
            </p>
            <br />
            <p className="color-secondary">
              To kick off our Convex model, Apollo will be holding a Lockdrop
              where users can lock up Astro/xAstro for a period of time to
              receive bonus Apollo tokens linearly from the end of the Lockdrop.
              After the lock period ends, depositors will be able to claim their
              Astro deposit, plus all the accrued yield.
            </p>
            <br />
            <p className="color-primary weight-600">
              xAstro Lockdrop Overview:
            </p>
            <p className="color-secondary">
              <ul style={{ marginLeft: 20 }}>
                <li>
                  Launching on the 2nd of May with deposits open for 5 days{' '}
                </li>
                <li>
                  Deposit and lock up Astro/xAstro for between 3 and 12 months{' '}
                </li>
                <li>
                  5 million Apollo tokens (5% of total supply) shared among
                  depositors{' '}
                </li>
                <li>Apollo tokens vested linearly over 12 months </li>
                <li>
                  Receive bonus Apollo tokens linearly from the end of the
                  Lockdrop and then receive your Astro deposit, plus all the
                  accrued yield at the end of your lock period.
                </li>
              </ul>
            </p>
            <br />
            <p className="color-secondary">
              Apollo’s aim with our Convex model is not to just attract large
              amounts of Astro liquidity upfront, but to ensure we can provide a
              long term solution allowing users to gain a high yield on their
              Astro tokens, while always remaining liquid and benefiting Apollo
              Vaults with increased yield.
            </p>
            <br />
            <p className="color-primary weight-600">More Info</p>
            <p className="color-secondary">
              For more information on the Lockdrop, please read this{' '}
              <a
                className="color-link"
                href="https://articles.apollo.farm/the-apollo-xastro-lockdrop/"
                target="_blank"
                rel="noreferrer">
                article
              </a>
              .
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
