import React from "react";
import {
  Text,
  Flex,
  Box,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";
import { num, TxStep } from "@arthuryeti/terra";

import { useLockedLpAmount, UnlockState } from "modules/lockdrop";
import { ONE_TOKEN } from "constants/constants";

import Card from "components/Card";
import FormFee from "components/common/FormFee";
import AmountInput from "components/AmountInput";
import WithdrawFormSlider from "components/pool/withdraw/WithdrawFormSlider";

type Params = {
  state: UnlockState;
  onClick: () => void;
};

const UnlockFormInitial = ({ state, onClick }: Params) => {
  const { control, watch, setValue } = useFormContext();

  const lpToken = watch("lpToken");
  const stakedAmount = useLockedLpAmount(lpToken.asset);
  const max = num(stakedAmount).div(ONE_TOKEN).toNumber();

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
          <WithdrawFormSlider
            value={+lpToken.amount}
            max={+max}
            ratio={0.5}
            onChange={handleChange}
          />
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
          Unlock LP Token
        </Button>
        {state.txStep == TxStep.Ready && <FormFee fee={state.fee} />}
      </Flex>
    </>
  );
};

export default UnlockFormInitial;
