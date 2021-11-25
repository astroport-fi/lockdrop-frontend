import React, { FC, useState } from "react";
import { Box, Text, Link } from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";
import { num, useBalance } from "@arthuryeti/terra";

import { lookup } from "libs/parse";
import { WithdrawState } from "modules/pool";

import Card from "components/Card";
import AmountInput from "components/AmountInput";
import WithdrawFormFooter from "components/pool/withdraw/WithdrawFormFooter";
import WithdrawFormItem from "components/pool/withdraw/WithdrawFormItem";
import WithdrawFormSlider from "components/pool/withdraw/WithdrawFormSlider";

type Props = {
  pool: any;
  token: {
    asset: string;
    amount: string;
  };
  state: WithdrawState;
  onClick: () => void;
};

const WithdrawFormInitial: FC<Props> = ({ pool, token, state, onClick }) => {
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
          rewards.{" "}
          <Link
            href="https://astroport.medium.com/hello-astro-announcing-the-astroport-governance-token-drops-a07a1bf3ed94"
            target="_blank"
            color="#51947B"
          >
            learn more
          </Link>
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

      <WithdrawFormSlider pool={pool} token={token} state={state} ratio={0.3} />

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
