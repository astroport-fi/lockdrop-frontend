import React, { FC, useMemo } from "react";
import { Box, Text, Center, HStack } from "@chakra-ui/react";
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
        <Text variant="light">
          Provide liquidity to the ASTRO - UST bootstrapping pool. Make sure to
          read the phase 2 explainer to fully understand the potential risks and
          benefits. To supply a single asset, leave the second asset&apos;s
          field blank or type &apos;0&apos;.
          <br />
          <br />
          Be aware that you can not withdraw your ASTRO tokens once they’ve been
          deposited.
        </Text>
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
