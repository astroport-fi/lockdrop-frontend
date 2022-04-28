import React from 'react';
import { Box } from '@mui/material';
import { Image } from '@chakra-ui/react';
import ApolloCountdown from './ApolloCountdown';

const LockdropIntroduction = () => {
  return (
    <Box>
      <Box position="relative" borderRadius="15px" overflow="hidden">
        <Image src="/hero_image_background.png" alt="lockdrop background" />
        <Box position="absolute" bottom={0}>
          <Image src="/hero_image_characters.png" alt="lockdrop banner" />
        </Box>
      </Box>
      <Box my={4} display="flex" justifyContent="space-between">
        <Box>
          <Box mb={1}>
            <Image
              src="/apolloDAO_logo.png"
              height={30}
              alt="Apollo DAO Logo"
            />
          </Box>
          <h1 className="color-primary">xASTRO Lockdrop</h1>
        </Box>
        <Box textAlign="center">
          <Box mb={1}>
            <h6 className="color-primary">BEGINS IN</h6>
          </Box>
          <ApolloCountdown />
        </Box>
      </Box>
    </Box>
  );
};

export default LockdropIntroduction;
