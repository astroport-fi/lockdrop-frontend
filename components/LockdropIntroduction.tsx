import React from 'react';
import { Box, Grid, useTheme, useMediaQuery } from '@mui/material';
import { Image } from '@chakra-ui/react';
import ApolloCountdown from './ApolloCountdown';

const LockdropIntroduction = () => {
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('sm'));
  return (
    <Box>
      <Box position="relative" borderRadius="15px" overflow="hidden">
        <Image src="/hero_image_background.png" alt="lockdrop background" />
        <Box position="absolute" bottom={0}>
          <Image src="/hero_image_characters.png" alt="lockdrop banner" />
        </Box>
      </Box>
      <Grid container spacing={4} my={4}>
        <Grid item textAlign={isMobile ? 'center' : 'left'} xs={12} sm={6}>
          <Box
            display="flex"
            justifyContent={isMobile ? 'center' : 'flex-start'}
            mb={1}>
            <Image
              src="/apolloDAO_logo.png"
              height={30}
              alt="Apollo DAO Logo"
            />
          </Box>
          <h1 className="color-primary obviouslyFont">xASTRO Lockdrop</h1>
        </Grid>
        <Grid
          item
          container
          justifyContent={isMobile ? 'center' : 'flex-end'}
          xs={12}
          sm={6}>
          <Box textAlign="center">
            <Box mb={1}>
              <h6 className="color-primary obviouslyFont">BEGINS IN</h6>
            </Box>
            <ApolloCountdown />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LockdropIntroduction;
