import React from "react";
import {
  Text,
  Flex,
  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";
import { num, TxStep } from "@arthuryeti/terra";

import { useStakedLpAmount, UnlockState } from "modules/lockdrop";
import { ONE_TOKEN } from "constants/constants";
import { useFeeToString } from "hooks/useFeeToString";

import Card from "components/Card";
import FormFee from "components/common/FormFee";
import AmountInput from "components/AmountInput";

import LockActions from "components/lp/lock/LockActions";

type Params = {
  state: UnlockState;
  onClick: () => void;
};

const UnlockFormInitial = ({ state, onClick }: Params) => {
  const { control, watch, setValue } = useFormContext();

  const lpToken = watch("lpToken");
  const stakedAmount = useStakedLpAmount(lpToken.asset);
  const max = num(stakedAmount).div(ONE_TOKEN).toNumber();

  const handleChange = (value: number) => {
    setValue("lpToken.amount", String(value));
  };

  const feeString = useFeeToString(state.fee);

  return (
    <>
      <LockActions />

      <Card mb="2">
        <Text variant="light">
          ASTRO Generators support &quot;dual liquidity mining.&quot; Lock your
          Astroport LP tokens here to receive ASTRO governance tokens AND
          third-party governance tokens.[Read More]
        </Text>
      </Card>

      <Card>
        <Controller
          name="lpToken"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <AmountInput balance={stakedAmount} {...field} isLpToken isSingle />
          )}
        />
      </Card>

      <Card mt="2">
        <Slider
          variant="brand"
          size="lg"
          min={0}
          defaultValue={0}
          value={Number(lpToken.amount)}
          max={max}
          focusThumbOnChange={false}
          step={0.0001}
          onChange={handleChange}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Card>

      {state.error && (
        <Card mt="3">
          <Text variant="light">{state.error}</Text>
        </Card>
      )}

      <Flex flex="1" align="center" flexDirection="column" mt="8">
        <Button
          variant="primary"
          isLoading={state.txStep == TxStep.Estimating}
          isDisabled={state.txStep != TxStep.Ready}
          minW="64"
          onClick={onClick}
        >
          Unlock LP Token
        </Button>
        {state.txStep == TxStep.Ready && <FormFee fee={state.fee} />}
      </Flex>
    </>
  );
};

export default UnlockFormInitial;
