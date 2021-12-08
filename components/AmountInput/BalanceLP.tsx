import React, { FC } from "react";
import { Box, Text, Flex, chakra, HStack } from "@chakra-ui/react";
import { fromTerraAmount, useBalance } from "@arthuryeti/terra";

type Props = {
  asset: string;
  initial?: string;
  label?: string;
  hideLabel?: boolean;
  onChange: (value: string) => void;
};

const BalanceLP: FC<Props> = ({
  asset,
  label = "In Wallet",
  initial,
  hideLabel = false,
  onChange,
}) => {
  const balance = useBalance(asset);
  const amount = fromTerraAmount(initial ?? balance, "0.0[00000]");

  return (
    <Flex align="center" justify="space-between" mt="1">
      <Box>
        <HStack spacing="4">
          <Text fontSize="sm" fontWeight="500" color="white.400" maxW="24">
            {label}:
          </Text>{" "}
          <Text fontSize="sm" color="white" ml="2">
            {fromTerraAmount(initial ?? balance, "0,0.00")}
          </Text>
        </HStack>
      </Box>
      <Box>
        <chakra.button
          type="button"
          outline="none"
          color="white.600"
          fontSize="xs"
          textTransform="uppercase"
          bg="white.100"
          fontWeight="bold"
          px="3"
          borderRadius="md"
          letterSpacing="widest"
          onClick={() => onChange(amount)}
        >
          Max
        </chakra.button>
      </Box>
    </Flex>
  );
};

export default BalanceLP;
