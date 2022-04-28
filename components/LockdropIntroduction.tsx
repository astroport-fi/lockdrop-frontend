import React from 'react';
import { Box } from '@mui/material';
import { Image } from '@chakra-ui/react';

const LockdropIntroduction = () => {
  return (
    <Box>
      <Box position="relative" borderRadius="15px" overflow="hidden">
        <Image src="/hero_image_background.png" alt="lockdrop banner" />
        <Box position="absolute" bottom={0}>
          <Image src="/hero_image_characters.png" alt="lockdrop banner" />
        </Box>
      </Box>
    </Box>
  );
};

export default LockdropIntroduction;
