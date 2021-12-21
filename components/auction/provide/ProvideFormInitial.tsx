import React, { FC, useMemo } from "react";
import {
  Box,
  Text,
  Center,
  HStack,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";
import { num, fromTerraAmount, useBalance } from "@arthuryeti/terra";

import { ProvideState } from "modules/auction";
import { useAirdropBalance } from "modules/airdrop";
import { ONE_TOKEN } from "constants/constants";
import { useUserInfo } from "modules/lockdrop";

import Card from "components/Card";
import AmountInput from "components/AmountInput";
import Single from "components/AmountInput/Single";
import ProvideFormFooter from "components/auction/provide/ProvideFormFooter";
import PlusCircleIcon from "components/icons/PlusCircleIcon";
import numeral from "numeral";

type Props = {
  state: ProvideState;
  onClick: () => void;
};

const ProvideFormInitial: FC<Props> = ({ state, onClick }) => {
  const { control, watch } = useFormContext();
  const userInfo = useUserInfo();
  const airdropBalance = useAirdropBalance();
  const uusdBalance = useBalance("uusd");
  const uusd = watch("uusd");
  const astroLockdrop = watch("astroLockdrop");
  const astroAirdrop = watch("astroAirdrop");

  const totalAstro = useMemo(() => {
    let lockBalance = 0;
    let airdropBalance = 0;

    if (num(astroLockdrop.amount).gt(0)) {
      lockBalance = num(astroLockdrop.amount).toNumber();
    }
    if (num(astroAirdrop.amount).gt(0)) {
      airdropBalance = num(astroAirdrop.amount).toNumber();
    }

    return lockBalance + airdropBalance;
  }, [astroAirdrop, astroLockdrop]);

  const totalust = useMemo(() => {
    let balance = 0;

    if (num(uusd.amount).gt(0)) {
      balance = num(uusd.amount).toNumber();
    }

    return balance;
  }, [uusd]);

  const lockdropBalance = useMemo(() => {
    if (userInfo == null) {
      return null;
    }

    return num(userInfo.total_astro_rewards)
      .minus(userInfo.delegated_astro_rewards)
      .toString();
  }, [userInfo]);

  const totalBalance = num(lockdropBalance).plus(airdropBalance).toString();

  return (
    <>
      <Box px="6" mb="4">
        <Text fontSize="xl" color="white">
          Provide ASTRO and/or UST to the bootstrapping pool
        </Text>
      </Box>
      <Card mb="2">
        <Text variant="light" mb="2">
          Be aware:
        </Text>
        <UnorderedList variant="content" opacity={0.5} pl="0">
          <ListItem variant="light" fontSize="xs" mb="1">
            You cannot withdraw ASTRO tokens deposited in the bootstrap pool
            until after the full Astroport app is live and your tokens have
            unlocked.
          </ListItem>
          <ListItem variant="light" fontSize="xs">
            Once phase 2 ends and the ASTRO-UST pool goes live, you’ll receive
            ASTRO-UST LP tokens (which have 50% exposure to UST and 50% exposure
            to ASTRO) in return for your ASTRO and/or UST deposit. These LP
            tokens unlock linearly over 90 days, starting when the ASTRO-UST
            liquidity pool goes live on Astroport.{" "}
          </ListItem>
        </UnorderedList>
      </Card>

      <Card py="10">
        <HStack spacing="6">
          <Box flex="1">
            <Single asset={astroLockdrop.asset} />
          </Box>
          <Box flex="1" textAlign="right">
            <Text fontSize="xl">{fromTerraAmount(totalBalance, "0,0.00")}</Text>
            <Text variant="light" fontSize="xs">
              Available ASTRO Balance
            </Text>
          </Box>
        </HStack>

        <HStack spacing="6" mt="12">
          <Box flex="1">
            <Text mb="2">ASTRO from Phase 1</Text>
            <Controller
              name="astroLockdrop"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <AmountInput
                  {...field}
                  hideLabel
                  hideBalanceLabel
                  balance={lockdropBalance}
                  limit={num(lockdropBalance).div(ONE_TOKEN).toNumber()}
                  balanceLabel="In Lockdrop"
                  isSingle
                />
              )}
            />
          </Box>
          <Box flex="1">
            <Text mb="2">ASTRO from Airdrop</Text>

            <Controller
              name="astroAirdrop"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <AmountInput
                  {...field}
                  balance={airdropBalance}
                  limit={num(airdropBalance).div(ONE_TOKEN).toNumber()}
                  hideBalanceLabel
                  hideLabel
                  balanceLabel="In Airdrop"
                  isSingle
                />
              )}
            />
          </Box>
        </HStack>

        <HStack
          mt="8"
          color="white"
          borderWidth="1px"
          borderRadius="xl"
          borderColor="white.200"
          bg="white.100"
          px="4"
          py="4"
          justify="space-between"
        >
          <Text fontSize="sm" color="white.600">
            ASTRO to provide to bootstrap pool
          </Text>
          <Text color="brand.lightPurple">
            {numeral(totalAstro).format("0,0.00")} ASTRO
          </Text>
        </HStack>
      </Card>

      <Center my="-2">
        <PlusCircleIcon />
      </Center>

      <Card py="10">
        <Controller
          name="uusd"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <AmountInput
              limit={num(uusdBalance).div(ONE_TOKEN).toNumber()}
              isSingle
              {...field}
            />
          )}
        />

        <HStack
          mt="8"
          color="white"
          borderWidth="1px"
          borderRadius="xl"
          borderColor="white.200"
          bg="white.100"
          px="4"
          py="4"
          justify="space-between"
        >
          <Text fontSize="sm" color="white.600">
            UST to provide to bootstrap pool
          </Text>
          <Text color="brand.lightPurple">
            {numeral(uusd.amount).format("0,0.00")} UST
          </Text>
        </HStack>
      </Card>

      {state.error && (
        <Card mt="3">
          <Text variant="light">{state.error}</Text>
        </Card>
      )}

      <ProvideFormFooter
        data={state}
        astroAmount={totalAstro}
        ustAmount={totalust}
        onConfirmClick={onClick}
      />
    </>
  );
};

export default ProvideFormInitial;
