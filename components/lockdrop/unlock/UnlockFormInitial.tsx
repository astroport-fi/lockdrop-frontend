import React, { useMemo } from "react";
import { Text, Flex, Box, ListItem, UnorderedList } from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";
import { num } from "@arthuryeti/terra";

import {
  useLockedLpAmount,
  UnlockState,
  useLockdropLogic,
} from "modules/lockdrop";

import Card from "components/Card";
import AmountInput from "components/AmountInput";
import AstroSlider from "components/AstroSlider";
import UnlockFormFooter from "components/lockdrop/unlock/UnlockFormFooter";
import { ONE_TOKEN } from "constants/constants";

type Params = {
  state: UnlockState;
  duration: number;
  onClick: () => void;
};

const UnlockFormInitial = ({ state, duration, onClick }: Params) => {
  const { control, watch, setValue } = useFormContext();

  const lpToken = watch("lpToken");
  const stakedAmount = useLockedLpAmount(lpToken.asset, duration);
  const { max, realMax } = useLockdropLogic({
    lpToken: lpToken.asset,
    duration,
  });

  // const amount = useMemo(() => {
  //   if (num(lpToken.amount).eq(0) || lpToken.amount == "") {
  //     return num(stakedAmount).div(ONE_TOKEN).toString();
  //   }

  //   return num(stakedAmount).div(ONE_TOKEN).minus(lpToken.amount).toString();
  // }, [lpToken.amount, stakedAmount]);

  const balance = useMemo(() => {
    if (realMax == null) {
      return "0";
    }

    return num(realMax).times(ONE_TOKEN).toString();
  }, [realMax]);

  const handleChange = (value: number) => {
    setValue("lpToken", {
      ...lpToken,
      amount: String(value),
    });
  };

  return (
    <>
      <Flex justify="space-between" color="white" mb="4" px="6">
        <Box flex="1">
          <Text fontSize="xl" color="white">
            Unlock LP Tokens
          </Text>
        </Box>
      </Flex>

      <Card mb="2">
        <Text fontSize="xs" color="white.500">
          <UnorderedList fontWeight="500">
            <ListItem>
              Depositing and withdrawing is allowed for the first 5 days of
              Phase 1.
            </ListItem>
            <ListItem>Deposits close at the end of Day 5.</ListItem>
            <ListItem>
              On Day 6, users can withdraw up to 50% of their deposits.
            </ListItem>
            <ListItem>
              On Day 7, the final day, the max withdrawable amount decreases
              linearly, starting at 50% and decreasing to 0% at the end of the
              phase.
            </ListItem>
            <ListItem>
              <strong>
                Be aware: Only 1 withdrawal per position can be made during the
                last 2 days, after deposits are disabled.
              </strong>
            </ListItem>
          </UnorderedList>
        </Text>
      </Card>

      <Card>
        <Controller
          name="lpToken"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <AmountInput
              {...field}
              balance={balance}
              balanceLabel="Withdrawable LP Tokens"
              limit={+realMax}
              isLpToken
              isSingle
              hideMaxButton
            />
          )}
        />

        <Box mt="8">
          <AstroSlider
            value={+lpToken.amount}
            min={0}
            max={num(stakedAmount).div(ONE_TOKEN).toNumber()}
            maxAllowed={max}
            onChange={handleChange}
            hideButtons
            hasMaxSystem
          />
        </Box>
      </Card>

      {state.error && (
        <Card mt="3">
          <Text variant="light">{state.error}</Text>
        </Card>
      )}

      <UnlockFormFooter
        amount={lpToken.amount}
        lpToken={lpToken.asset}
        duration={duration}
        data={state}
        onConfirmClick={onClick}
      />
    </>
  );
};

export default UnlockFormInitial;
