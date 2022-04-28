import React, { FC, ReactNode } from 'react';
import { Box, Flex, Link, Spacer, VStack } from '@chakra-ui/react';
import ApolloCardHeader from './ApolloCardHeader';
import MyLockdropDepositsHeader from './MyLockdropDepositsHeader';
import MyxAstroTableRow from './MyxAstroTableRow';
import ExternalLinkIcon from './icons/ExternalLinkIcon';
import MyxAstroTableHeader from './MyxAstroTableHeader';
import WidgetContainer from './WidgetContainer';
import Stack from '@mui/material/Stack';
import { almostWhite } from '../theme/mui-theme';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

type Props = {};

const assets = [
  {
    name: 'xASTRO',
    amount: 20000,
    inWallet: 2500
  }
];

const MyxAstroTable: FC<Props> = ({}) => {
  return (
    <WidgetContainer
      title="My xASTRO"
      titleFontVariant="body2"
      padding={0}
      linkText="Learn more"
      linkUrl="#"
      style={{ width: '100%' }}>
      <Stack>
        <MyxAstroTableHeader />
        {assets.map((assetRecord: any, i: number) => {
          const { name, amount, inWallet } = assetRecord;
          return (
            <MyxAstroTableRow
              key={'row-' + i}
              name={name}
              amount={amount}
              inWallet={inWallet}
            />
          );
        })}
      </Stack>
    </WidgetContainer>
  );
};

export default MyxAstroTable;
