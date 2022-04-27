import React, { FC, ReactNode } from 'react';
import {
  Box,
  Button,
  Flex,
  HStack,
  Link,
  Spacer,
  Stack,
  VStack
} from '@chakra-ui/react';
import ApolloCardHeader from './ApolloCardHeader';
import ApolloCardBody from './ApolloCardBody';
import ExternalLinkIcon from './icons/ExternalLinkIcon';
import Grid from '@mui/material/Grid';
import { almostWhite } from '../theme/mui-theme';

type Props = {
  name: any;
  amount: string;
  inWallet: number;
};

const MyxAstroTableRow: FC<Props> = ({ name, amount, inWallet }: Props) => {
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      direction="row"
      sx={{
        p: '4px 8px',
        color: almostWhite
      }}>
      <Grid item>{name}</Grid>
      <Grid item>{amount}</Grid>
      <Grid item>{inWallet}</Grid>
      <Grid item>
        <Button>Lock xASTRO</Button>
      </Grid>
    </Grid>
  );
  return (
    <Stack
      my="0"
      spacing="0"
      align="stretch"
      px="8"
      py="4"
      background={'whiteAlpha.50'}
      borderBottomWidth="2px"
      borderColor="white.100"
      position="relative"
      color="whiteAlpha.500"
      _last={{
        borderBottomWidth: '0',
        borderBottomRadius: 10
      }}>
      <Box>{name}</Box>
      <Spacer />
      <Box>{amount}</Box>
      <Spacer />
      <Box>{inWallet}</Box>
      <Spacer />
      <Box>
        <Button>Lock xASTRO</Button>
      </Box>
    </Stack>
  );
};

export default MyxAstroTableRow;
