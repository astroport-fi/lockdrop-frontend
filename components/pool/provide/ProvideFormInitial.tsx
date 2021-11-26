import React, { FC } from "react";
import { Box, Text, Link } from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";
import { fromTerraAmount, useBalance } from "@arthuryeti/terra";

import { ProvideState } from "modules/pool";

import Card from "components/Card";
import AmountInput from "components/AmountInput";
import ProvideFormFooter from "components/pool/provide/ProvideFormFooter";

type Props = {
  astro: {
    amount: string;
    asset: string;
  };
  uusd: {
    amount: string;
    asset: string;
  };
  state: ProvideState;
  onClick: () => void;
};

const ProvideFormInitial: FC<Props> = ({ astro, uusd, state, onClick }) => {
  const astroBalance = useBalance(astro.asset);
  const uusdBalance = useBalance(uusd.asset);
  const { control, setValue } = useFormContext();

  const balance = useBalance(astro.asset);
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
          name="astro"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <AmountInput {...field} isSingle />}
        />
      </Card>

      <Card mt="2">
        <Controller
          name="uusd"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <AmountInput {...field} isSingle />}
        />
      </Card>

      {state.error && (
        <Card mt="3">
          <Text variant="light">{state.error}</Text>
        </Card>
      )}

      <ProvideFormFooter data={state} onConfirmClick={onClick} />
    </>
  );
};

export default ProvideFormInitial;
