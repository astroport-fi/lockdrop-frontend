import React from "react";
import { Text, Flex, Box, ListItem, UnorderedList } from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";
import { num } from "@arthuryeti/terra";

import { useLockedLpAmount, UnlockState } from "modules/lockdrop";
import { ONE_TOKEN } from "constants/constants";

import Card from "components/Card";
import AmountInput from "components/AmountInput";
import FormSlider from "components/FormSlider";
import UnlockFormFooter from "components/lockdrop/unlock/UnlockFormFooter";

type Params = {
  state: UnlockState;
  duration: number;
  onClick: () => void;
};

const UnlockFormInitial = ({ state, duration, onClick }: Params) => {
  const { control, watch, setValue } = useFormContext();

  const lpToken = watch("lpToken");
  const stakedAmount = useLockedLpAmount(lpToken.asset);
  const max = num(stakedAmount).div(ONE_TOKEN).toNumber();
  const amount = num(max).minus(lpToken.amount).toString();

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
              Deposits and withdraws are possible during the first 5 days.
            </ListItem>
            <ListItem>Deposits close at the end of Day 5.</ListItem>
            <ListItem>
              On Day 6, users can withdraw up to 50% of their deposits.
            </ListItem>
            <ListItem>
              On Day 7, the final day, the max withdrawable amount decreases
              linearly, starting at 50% and decreasing to 0% at the end of the
              lockdrop.
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
            <AmountInput balance={stakedAmount} {...field} isLpToken isSingle />
          )}
        />

        <Box mt="8">
          <FormSlider
            value={+lpToken.amount}
            max={+max}
            ratio={1}
            onChange={handleChange}
          />
        </Box>
      </Card>

      {state.error && (
        <Card mt="3">
          <Text variant="light">{state.error}</Text>
        </Card>
      )}

      <UnlockFormFooter
        amount={amount}
        lpToken={lpToken.asset}
        duration={duration}
        data={state}
        onConfirmClick={onClick}
      />
    </>
  );
};

export default UnlockFormInitial;
