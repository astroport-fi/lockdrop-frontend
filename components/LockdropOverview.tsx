import React, { FC, ReactNode } from 'react';
import { Box, Flex, Link, Spacer, VStack } from '@chakra-ui/react';
import ApolloCardHeader from './ApolloCardHeader';
import ApolloCardBody from './ApolloCardBody';
import ExternalLinkIcon from './icons/ExternalLinkIcon';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import WidgetContainer from './WidgetContainer';
import Stack from '@mui/material/Stack';
import { white60 } from '../theme/mui-theme';
import ApolloLockdropStat from './ApolloLockdropStat';
import ApolloLockdropRewardsCard from './ApolloLockdropRewardsCard';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import ApolloFormattedStatistic from './ApolloFormattedStatistic';
import { addressState } from '../data/wallet';
import { useRecoilValue } from 'recoil';

type Props = {};

const useStyles: any = makeStyles((theme: Theme) => ({
  lighter: {
    color: white60
  },
  smaller: {
    fontSize: '1.0rem',
    fontWeight: 'normal'
  }
}));

const LockdropOverview: FC<Props> = ({}) => {
  const classes = useStyles();
  const userWalletAddr = useRecoilValue(addressState);

  return (
    <WidgetContainer
      title="xASTRO Lockdrop"
      titleFontVariant="body2"
      padding={0}
      linkText="Learn More"
      linkUrl="https://articles.apollo.farm/the-apollo-xastro-lockdrop/" // todo: link to lockdrop page
      style={{ width: '100%' }}>
      <Grid container p={5} justifyContent="center" alignItems="center">
        <Grid item md={4} xs={12} textAlign="center" justifyContent="center">
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <ApolloLockdropStat
                titleContent={
                  <ApolloFormattedStatistic
                    value={5000000}
                    fontSize="26px"
                    postFix={'APOLLO'}
                  />
                }
                subtitle={'Total Lockdrop Rewards'}
                textAlign="left"
              />
            </Grid>
            <Grid item>
              <ApolloLockdropStat
                titleContent={
                  <ApolloFormattedStatistic
                    value={1}
                    decimals={2}
                    percentage={true}
                    fontSize="26px"
                  />
                }
                subtitle={'My Est. % of Lockdrop Rewards'}
                textAlign="left"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={4} xs={12} textAlign="center" alignItems="center">
          <ApolloLockdropRewardsCard amount={userWalletAddr ? 100000 : 0} />
        </Grid>
        <Grid item md={4} xs={12} textAlign="right">
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <ApolloLockdropStat
                titleContent={
                  <ApolloFormattedStatistic
                    value={2000000}
                    decimals={2}
                    decimalsInGrey={true}
                    postFix={'xASTRO'}
                    fontSize="26px"
                  />
                }
                subtitle={'Total Deposits in Lockdrop'}
                textAlign="right"
              />
            </Grid>
            <Grid item>
              <ApolloLockdropStat
                titleContent={
                  <ApolloFormattedStatistic
                    value={20000}
                    decimals={2}
                    decimalsInGrey={true}
                    postFix={'xASTRO'}
                    fontSize="26px"
                  />
                }
                subtitle={'My Total Deposits in Lockdrop'}
                textAlign="right"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </WidgetContainer>
  );
};

export default LockdropOverview;
