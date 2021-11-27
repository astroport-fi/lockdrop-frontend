import React, { FC } from "react";
import { Box, Text, UnorderedList, ListItem } from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";
import { num, useBalance } from "@arthuryeti/terra";

import { lookup } from "libs/parse";
import { ONE_TOKEN } from "constants/constants";
import { WithdrawState, useUserInfo } from "modules/auction";

import Card from "components/Card";
import AmountInput from "components/AmountInput";
import WithdrawFormFooter from "components/auction/withdraw/WithdrawFormFooter";
import FormSlider from "components/FormSlider";

type Props = {
  token: {
    asset: string;
    amount: string;
  };
  state: WithdrawState;
  onClick: () => void;
};

const WithdrawFormInitial: FC<Props> = ({ token, state, onClick }) => {
  const { control, setValue } = useFormContext();
  const userInfo = useUserInfo();

  const balance = useBalance(token.asset);
  const amount = lookup(balance, token.asset);
  const max = num(userInfo?.ust_delegated).div(ONE_TOKEN).toFixed(2);

  const handleChange = (value: number) => {
    setValue("token", {
      ...token,
      amount: String(value),
    });
  };

  return (
    <>
      <Box px="6" mb="4">
        <Text fontSize="xl" color="white">
          Withdraw UST from bootstrapping pool
        </Text>
      </Box>
      <Card mb="2">
        <Text fontSize="xs" color="white.500">
          <UnorderedList fontWeight="500">
            <ListItem>
              Depositing and withdrawing is allowed for the first 5 days of
              Phase 2.
            </ListItem>
            <ListItem>Deposits close at the end of Day 5.</ListItem>
            <ListItem>
              On Day 6, users can withdraw up to 50% of their deposited UST.
            </ListItem>
            <ListItem>
              On day 7, the final day, the max withdrawable amount decreases
              linearly, starting at 50% and decreasing to 0% at the end of the
              lockdrop.
            </ListItem>
            <ListItem>
              Be aware: Only 1 withdrawal can be made during the last 2 days
              after deposits are disabled
            </ListItem>
          </UnorderedList>
        </Text>
      </Card>

      <Card>
        <Controller
          name="token"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <AmountInput {...field} balance={max} isSingle />
          )}
        />

        <Box mt="8">
          <FormSlider
            value={+token.amount}
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

      <WithdrawFormFooter
        data={state}
        amount={+token.amount}
        onConfirmClick={onClick}
      />
    </>
  );
};

export default WithdrawFormInitial;