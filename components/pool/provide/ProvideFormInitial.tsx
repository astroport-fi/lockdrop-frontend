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

  //TODO: refactor with function below
  const handleToken1Change = (value: any, onChange: (value: any) => void) => {
    const formattedToken2Balance = fromTerraAmount(token2Balance, "0.0[00000]");
    const token2amount = calculateTokenAmount(pool, value.asset, value.amount);
    const potentialToken1amount = calculateTokenAmount(
      pool,
      token2.asset,
      formattedToken2Balance
    );

    if (num(token2amount).gt(formattedToken2Balance)) {
      setValue(
        "token2.amount",
        num(formattedToken2Balance).minus("4").toString()
      );
      onChange({ ...value, amount: potentialToken1amount });
    } else {
      onChange(value);
      setValue("token2.amount", token2amount);
    }
  };

  //TODO: refactor with above function
  const handleToken2Change = (value: any, onChange: (value: any) => void) => {
    const formattedToken1Balance = fromTerraAmount(token1Balance, "0.0[00000]");
    const token1amount = calculateTokenAmount(pool, value.asset, value.amount);
    const potentialToken1amount = calculateTokenAmount(
      pool,
      token1.asset,
      formattedToken1Balance
    );

    if (num(token1amount).gt(formattedToken1Balance)) {
      setValue("token2.amount", formattedToken1Balance);
      onChange({ ...value, amount: potentialToken1amount });
    } else {
      onChange(value);
      setValue("token1.amount", token1amount);
    }
  };

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
          render={({ field }) => (
            <AmountInput
              {...field}
              limit={Number(amount)}
              isSingle
              onChange={(v: any) => handleToken1Change(v, field.onChange)}
            />
          )}
        />
      </Card>

      <Card mt="2">
        <Controller
          name="token2"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <AmountInput
              {...field}
              isSingle
              onChange={(v: any) => handleToken2Change(v, field.onChange)}
            />
          )}
        />
      </Card>

      {/* <Card mt="2">
        <Slider
          variant="brand"
          size="lg"
          min={0}
          defaultValue={0}
          focusThumbOnChange={false}
          value={Number(token1.amount)}
          max={Number(amount)}
          onChange={handleChange}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Card> */}

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
