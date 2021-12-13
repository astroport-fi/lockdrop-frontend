import React, { FC } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";

import NextLink from "next/link";

import CloseIcon from "components/icons/CloseIcon";

const LockActions: FC = () => {
  return (
    <Flex justify="space-between" align="center" color="white" mb="4" px="6">
      <Box flex="1">
        <Text fontSize="xl" color="white">
          Lock your Terraswap LP tokens in Astroport
        </Text>
      </Box>
      <NextLink href="/active-phase" passHref>
        <Button as="a" variant="icon">
          <CloseIcon w="6" h="6" color="white" />
        </Button>
      </NextLink>
    </Flex>
  );
};

export default LockActions;
