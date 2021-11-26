import React, { FC } from "react";
import { Box, Text, Link } from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";
import { fromTerraAmount, num, useBalance } from "@arthuryeti/terra";

import { calculateTokenAmount, ProvideState } from "modules/pool";

import Card from "components/Card";
import AmountInput from "components/AmountInput";
import ProvideFormFooter from "components/pool/provide/ProvideFormFooter";

type Props = {
  pool: any;
  token1: {
    amount: string;
    asset: string;
  };
  token2: {
    amount: string;
    asset: string;
  };
  state: ProvideState;
  onClick: () => void;
};

const ProvideFormInitial: FC<Props> = ({
  pool,
  token1,
  token2,
  state,
  onClick,
}) => {
  const token1Balance = useBalance(token1.asset);
  const token2Balance = useBalance(token2.asset);
  const { control, setValue } = useFormContext();

  const balance = useBalance(token1.asset);
  const amount = fromTerraAmount(balance, "0.00");

  return (
    <>
      <Box px="6" mb="4">
        <Text fontSize="xl" color="white">
          Provide ASTRO and/or UST to the bootstrapping pool
        </Text>
      </Box>
      <Card mb="2">
        <Text variant="light">
          Provide liquidity to the ASTRO - UST bootstrapping pool. Make sure to
          read the phase 2 explainer to fully understand the potential risks and
          rewards. <Link>[learn more]</Link>
        </Text>
      </Card>
      <Card>
        <Controller
          name="token1"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <AmountInput {...field} isSingle />}
        />
      </Card>

      <Card mt="2">
        <Controller
          name="token2"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <AmountInput {...field} isSingle />}
        />
      </Card>

      <ProvideFormFooter
        pool={pool}
        amount={token1.amount}
        data={state}
        onConfirmClick={onClick}
      />
    </>
  );
};

export default ProvideFormInitial;
