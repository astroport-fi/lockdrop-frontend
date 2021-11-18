import React, { FC } from "react";
import {
  Box,
  Flex,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";
import { useBalance } from "@arthuryeti/terra";

import { lookup } from "libs/parse";
import { WithdrawState } from "modules/pool";

import Card from "components/Card";
import WithdrawFormItem from "components/pool/withdraw/WithdrawFormItem";

type Props = {
  pool: any;
  ratio?: number;
  token: {
    asset: string;
    amount: string;
  };
  state: WithdrawState;
};

const WithdrawFormSlider: FC<Props> = ({ pool, token, state, ratio = 0.3 }) => {
  const { control, setValue } = useFormContext();

  const balance = useBalance(token.asset);
  const amount = lookup(balance, token.asset);

  const handleChange = (value: number) => {
    setValue("token", {
      ...token,
      amount: String(value),
    });
  };

  const renderWithdrawFormItem1 = () => {
    if (state.token1 == null || state.token1Amount == null) {
      return;
    }

    return (
      <WithdrawFormItem
        token={state.token1}
        amount={state.token1Amount}
        mb="4"
      />
    );
  };

  const renderWithdrawFormItem2 = () => {
    if (state.token2 == null || state.token2Amount == null) {
      return;
    }

    return (
      <WithdrawFormItem token={state.token2} amount={state.token2Amount} />
    );
  };

  const maxUnlockableLiquidity = () => {
    if (ratio < 1) {
      return (
        <Box w={(1 - ratio) * 100 + "%"}>
          <Text color="red.500" mb="2" whiteSpace="nowrap" fontSize="12px">
            Max unlockable liquidity
          </Text>
          <Box position="relative" h="1" mb="3">
            <Box
              position="absolute"
              inset="0"
              w="100%"
              height="100%"
              bg="red.500"
              zIndex={1}
              opacity="0.4"
              borderRadius="lg"
            ></Box>
            <Box
              bg="red.500"
              w="4px"
              h="4px"
              borderRadius="4"
              position="absolute"
              left="0"
              top="0"
              zIndex={2}
              transform="translateX(-50%)"
            ></Box>
          </Box>
        </Box>
      );
    }
  };

  return (
    <Card mt="2">
      <Flex align="flex-end">
        <Box flex="1" position="relative" zIndex={10}>
          <Slider
            variant="brand"
            size="lg"
            min={0}
            defaultValue={0}
            value={Number(token.amount)}
            focusThumbOnChange={false}
            max={Number(amount) * ratio}
            onChange={handleChange}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>
        {maxUnlockableLiquidity()}
      </Flex>
    </Card>
  );
};

export default WithdrawFormSlider;
