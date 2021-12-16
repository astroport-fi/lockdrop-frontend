import React from "react";
import { Text, Box, Flex } from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";
import { num, useBalance } from "@arthuryeti/terra";

import { LockState, useLockdropLogic } from "modules/lockdrop";
import { ONE_TOKEN } from "constants/constants";

import Card from "components/Card";
import AstroSlider from "components/AstroSlider";
import AmountInput from "components/AmountInput";
import LockFormFooter from "components/lockdrop/lock/LockFormFooter";
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
  const logic = useLockdropLogic({ lpToken: token.asset, duration });
  const balance = useBalance(token.asset);
  const max = num(balance).div(ONE_TOKEN).toNumber();

  const handleChange = (value: number) => {
    setValue("token", { ...token, amount: value.toString() });
  };

  const handleDurationChange = (value: number) => {
    setValue("duration", value);
  };

  const renderError = () => {
    if (state.error == "Something went wrong") {
      return "Insufficient LUNA/UST to complete transaction";
    } else {
      return state.error;
    }
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
          {/* Tip: You can lock different amounts for different periods even within
          the same pool. */}
          <strong>
            You can have a maximum of 10 total positions open at any given time
            during phase 1.
          </strong>
        </Text>
      </Card>
      <Card>
        <Controller
          name="token"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <AmountInput
              {...field}
              balanceLabel="Available to Migrate"
              isLpToken
              isSingle
              limit={max}
              isDisabled={!logic.canDeposit}
            />
          )}
        />
        <Box mt="8">
          <AstroSlider
            min={0}
            defaultValue={0}
            value={+token.amount}
            max={max}
            focusThumbOnChange={false}
            step={0.01}
            onChange={handleChange}
            isDisabled={!logic.canDeposit}
          />
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
          <Box position="relative">
            <Text position="absolute" top="13px" right="4">
              weeks
            </Text>
            <Controller
              name="duration"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => <DateInput max={52} {...field} />}
            />
          </Box>
        </Flex>
        <Box mt="8">
          <AstroSlider
            min={2}
            minLabel="2 weeks"
            max={52}
            step={1}
            maxLabel="52 weeks"
            value={duration}
            onChange={handleDurationChange}
            isDisabled={!logic.canDeposit}
          />
        </Box>
      </Card>

      {state.error && (
        <Card mt="3">
          <Text variant="light">{renderError()}</Text>
        </Card>
      )}

      <LockFormFooter
        amount={token.amount}
        lpToken={token.asset}
        duration={duration}
        data={state}
        onConfirmClick={onClick}
        isDisabled={!logic.canDeposit}
      />
    </>
  );
};

export default LockFormInitial;
