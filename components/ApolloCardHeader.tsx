/* eslint-disable no-ternary */
import React, { FC, ReactNode } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

type Props = {
  children: ReactNode;
  noPadding?: boolean;
} & BoxProps;

const ApolloCardHeader: FC<Props> = ({
  children,
  noPadding = false,
  ...props
}) => {
  const py = !noPadding ? '6' : '0';
  const px = !noPadding ? '8' : '0';

  return (
    <Box
      bg="white.50"
      py={py}
      px={px}
      borderBottomWidth="2px"
      borderColor="white.100"
      borderTopRightRadius="2xl"
      borderTopLeftRadius="2xl"
      position="relative"
      color="white"
      {...props}>
      {children}
    </Box>
  );
};

export default ApolloCardHeader;
