import React, { FC, useState } from "react";
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
import { num, useBalance } from "@arthuryeti/terra";

import { lookup } from "libs/parse";
import { WithdrawState } from "modules/pool";

import Card from "components/Card";
import AmountInput from "components/AmountInput";
import WithdrawFormFooter from "components/pool/withdraw/WithdrawFormFooter";
import WithdrawFormItem from "components/pool/withdraw/WithdrawFormItem";

type Props = {
  pool: any;
  ratio?: number;
  token: {
    asset: string;
    amount: string;
  };
  state: WithdrawState;
  onClick: () => void;
};

const WithdrawFormInitial: FC<Props> = ({
  pool,
  token,
  state,
  ratio = 0.3,
  onClick,
}) => {
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

  return (
    <>
      <Box px="6" mb="4">
        <Text fontSize="xl" color="white">
          Withdraw UST from bootstrapping pool
        </Text>
      </Box>
      <Card mb="2">
        <Text variant="light">
          Provide liquidity to the ASTRO - UST bootstrapping pool. Make sure to
          read the phase 2 explainer to fully understand the potential risks and
          rewards. [learn more]
        </Text>
      </Card>

      <Card>
        <Controller
          name="token"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <AmountInput {...field} limit={Number(amount)} isSingle />
          )}
        />
      </Card>

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
              max={Number(amount)}
              onChange={handleChange}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>
          <Box w={ratio * 100 + "%"}>
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
        </Flex>
      </Card>

      <WithdrawFormFooter
        pool={pool}
        data={state}
        amount={num(amount)
          .minus(token.amount || "0")
          .toString()}
        onConfirmClick={onClick}
      />
    </>
  );
};

export default WithdrawFormInitial;
