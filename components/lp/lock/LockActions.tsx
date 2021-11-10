import React, { FC } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

const LockActions: FC = () => {
  return (
    <Flex justify="space-between" color="white" mb="4" px="6">
      <Box flex="1">
        <Text fontSize="xl" color="white">
          Lock your Terraswap LP tokens in Astroport
        </Text>
      </Box>
    </Flex>
  );
};

export default LockActions;
