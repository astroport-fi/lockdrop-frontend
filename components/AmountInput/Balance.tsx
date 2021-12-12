import React, { FC } from "react";
import { Box, Text, Flex, Button, HStack } from "@chakra-ui/react";
import { fromTerraAmount, useBalance } from "@arthuryeti/terra";

import { useTokenInfo } from "modules/common";
import { formatAsset } from "libs/parse";

type Props = {
  asset: string;
  label?: string;
  initial?: string;
  hideLabel?: boolean;
  hideButton?: boolean;
  isDisabled?: boolean;
  onChange: (value: string) => void;
};

const Balance: FC<Props> = ({
  asset,
  initial,
  label = "In Wallet",
  hideLabel = false,
  hideButton = false,
  isDisabled = false,
  onChange,
}) => {
  const { getSymbol } = useTokenInfo();
  const balance = useBalance(asset);
  const amount = fromTerraAmount(initial ?? balance, "0.00[0000]");

  const renderButton = () => {
    if (!hideButton) {
      return (
        <Button
          variant="mini"
          type="button"
          onClick={() => onChange(amount)}
          isDisabled={isDisabled}
        >
          Max
        </Button>
      );
    }
  };

  return (
    <Flex align="center" justify="space-between" mt="1">
      <Box>
        <HStack spacing="4">
          {!hideLabel && (
            <Text fontSize="sm" fontWeight="500" color="white.400">
              {label}:
            </Text>
          )}{" "}
          <Text fontSize="sm" color="white" ml="2">
            {formatAsset(initial ?? balance, getSymbol(asset))}
          </Text>
        </HStack>
      </Box>
      <Box>{renderButton()}</Box>
    </Flex>
  );
};

export default Balance;
