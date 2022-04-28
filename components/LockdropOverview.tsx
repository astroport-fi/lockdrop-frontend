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
import { almostWhite } from '../theme/mui-theme';

type Props = {};

const LockdropOverview: FC<Props> = ({}) => {
  return (
    <WidgetContainer
      title="xASTRO Lockdrop"
      titleFontVariant="body2"
      padding={0}
      style={{ width: '100%' }}>
      <Stack>
        <Grid container p={2}>
          <Grid item xs={12}>
            <Typography color={almostWhite} variant="caption" component="div">
              {`No voters found`}
            </Typography>
          </Grid>
        </Grid>
      </Stack>
    </WidgetContainer>
  );
};

export default LockdropOverview;
