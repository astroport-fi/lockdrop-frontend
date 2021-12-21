import React, { FC } from "react";
import { Box, Text, Flex, Button, HStack } from "@chakra-ui/react";
import { fromTerraAmount, num, useBalance } from "@arthuryeti/terra";

import { useTokenInfo } from "modules/common";
import { ONE_TOKEN } from "constants/constants";
import AmountMaxButton from "components/AmountMaxButton";
// import { formatAsset } from "libs/parse";

type Props = {
  asset: string;
  label?: string;
  initial?: string;
  hideLabel?: boolean;
  hideButton?: boolean;
  isDisabled?: boolean;
  onChange: (value: string | number) => void;
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
  const amount = num(initial).div(ONE_TOKEN).dp(3).toNumber();
  const max = num(initial).gt("0") ? amount : null;

  const renderButton = () => {
    if (!hideButton) {
      return (
        <AmountMaxButton
          asset={asset}
          max={max}
          onChange={onChange}
          isDisabled={isDisabled}
        />
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
            {fromTerraAmount(initial ?? balance, "0.00")} {getSymbol(asset)}
          </Text>
        </HStack>
      </Box>
      <Box>{renderButton()}</Box>
    </Flex>
  );
};

export default Balance;
