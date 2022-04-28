import React, { FC, ReactNode } from 'react';
import {
  Box,
  HStack,
  Link,
  Stack,
  Flex,
  Spacer,
  VStack,
  Icon,
  FlexProps
} from '@chakra-ui/react';
import CardHeader from './CardHeader';
import Card from './Card';
import ApolloCardBody from './ApolloCardBody';
import ApolloCardHeader from './ApolloCardHeader';
import ExternalLinkIcon from 'components/icons/ExternalLinkIcon';
import { almostWhite } from '../theme/mui-theme';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Timer from './Timer';
import dayjs from 'dayjs';
import Countdown from 'react-countdown';
import ApolloCountdown from './ApolloCountdown';

type Props = {};

const LockdropPageHeader: FC<Props> = ({}) => {
  return (
    <Grid container spacing={2}>
      <Grid item lg={4} md={4} xs={4}>
        <Typography variant="h6" color="textPrimary">
          STAGE II
        </Typography>
        <Typography variant="body2" color="textPrimary">
          During Stage 1 (Day 1-5) there are no limits on deposits and
          withdrawals of xASTRO. Once Stage 2 (Day 6) begins yo uwill only be
          able to withdraw xASTRO.
        </Typography>
      </Grid>
      <Grid item lg={4} md={4} xs={4} textAlign="center">
        <Typography variant="h6" color="textPrimary" sx={{ mb: 1 }}>
          TIME LEFT IN THIS STAGE
        </Typography>
        <ApolloCountdown />
      </Grid>
      <Grid item lg={4} md={4} xs={4}>
        <Typography variant="h6" color="textPrimary">
          TIMELINE
        </Typography>
      </Grid>
    </Grid>
  );
};

export default LockdropPageHeader;
