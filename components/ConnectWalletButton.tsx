import React from "react";

import { Text, HStack, chakra } from "@chakra-ui/react";

import TerraIcon from "components/icons/TerraIcon";

const ConnectWalletButton = () => {
  return (
    <chakra.button
      type="button"
      color="white"
      _focus={{
        outline: "none",
        boxShadow: "none",
      }}
      _hover={{
        bg: "brand.purple",
      }}
      bg="brand.lightBlue"
      py="2"
      px="4"
      borderRadius="full"
    >
      <HStack spacing="3">
        <TerraIcon width="1.25rem" height="1.25rem" />
        <Text>Connect your wallet</Text>
      </HStack>
    </chakra.button>
  );
};

export default ConnectWalletButton;
