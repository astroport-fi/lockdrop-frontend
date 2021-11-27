import React from "react";
import {
  Text,
  Box,
  Flex,
  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";
import { num, TxStep, useBalance } from "@arthuryeti/terra";

import { LockState } from "modules/lockdrop";
import { ONE_TOKEN } from "constants/constants";

import Card from "components/Card";
import FormFee from "components/common/FormFee";
import AmountInput from "components/AmountInput";
import DateInput from "components/DateInput";

import LockActions from "components/lockdrop/lock/LockActions";

type Params = {
  state: LockState;
  onClick: () => void;
};

const LockFormInitial = ({ state, onClick }: Params) => {
  const { control, watch, setValue } = useFormContext();

  const token = watch("token");
  const duration = watch("duration");
  const balance = useBalance(token.asset);
  const max = num(balance).div(ONE_TOKEN).toNumber();

  const handleChange = (value: number) => {
    setValue("token.amount", String(value));
  };

  const handleDurationChange = (value: number) => {
    setValue("duration", value);
  };

  return (
    <>
      <LockActions />

      <Card mb="2">
        <Text variant="light">
          Select how much liquidity you want to migrate from Terraswap to
          Astroport and how long you would like to lock it in Astroport.
          <br />
          <br />
          Tip: You can lock different amounts for different periods even within
          the same pool.
        </Text>
      </Card>

      <Card>
        <Controller
          name="token"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <AmountInput {...field} isLpToken isSingle />}
        />

        <Box mt="8">
          <Slider
            variant="brand"
            size="lg"
            min={0}
            defaultValue={0}
            value={+token.amount}
            max={max}
            focusThumbOnChange={false}
            step={0.01}
            onChange={handleChange}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>
      </Card>

      <Card mt="2">
        <Text>Select Lock End Date</Text>
        <Flex mt="4">
          <Box flex="1" mr="4">
            <Text variant="light" fontSize="xs">
              The longer you lock, the more ASTRO rewards you will receive.
            </Text>
          </Box>
          <Controller
            name="duration"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => <DateInput max={52} {...field} />}
          />
        </Flex>

        <Box mt="8">
          <Slider
            variant="brand"
            size="lg"
            min={1}
            defaultValue={0}
            value={duration}
            max={52}
            focusThumbOnChange={false}
            step={1}
            onChange={handleDurationChange}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>
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
          Lock LP Token
        </Button>
        {state.txStep == TxStep.Ready && <FormFee fee={state.fee} />}
      </Flex>
    </>
  );
};

export default LockFormInitial;
