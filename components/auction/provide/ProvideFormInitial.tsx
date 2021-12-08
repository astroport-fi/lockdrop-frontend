import React, { FC, useMemo } from "react";
import { Box, Text, Link, HStack } from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";
import { num, fromTerraAmount } from "@arthuryeti/terra";

import { ProvideState } from "modules/auction";
import { useAirdropBalance } from "modules/airdrop";
import { useUserInfo } from "modules/lockdrop";

import Card from "components/Card";
import AmountInput from "components/AmountInput";
import Single from "components/AmountInput/Single";
import ProvideFormFooter from "components/auction/provide/ProvideFormFooter";

type Props = {
  state: ProvideState;
  onClick: () => void;
};

const ProvideFormInitial: FC<Props> = ({ state, onClick }) => {
  const { control, watch } = useFormContext();
  const userInfo = useUserInfo();
  const airdropBalance = useAirdropBalance();
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
          field blank or type &apos;0&apos;.{" "}
          <Link
            href="https://astroport.medium.com/hello-astro-announcing-the-astroport-governance-token-drops-a07a1bf3ed94"
            target="_blank"
            color="#51947B"
          >
            learn more
          </Link>
        </Text>
      </Card>

      <Card>
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
                  hideBalanceLabel
                  hideLabel
                  balanceLabel="In Airdrop"
                  isSingle
                />
              )}
            />
          </Box>
        </HStack>
      </Card>

      <Card mt="2">
        <Controller
          name="uusd"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <AmountInput {...field} isSingle />}
        />
      </Card>

      {state.error && (
        <Card mt="3">
          <Text variant="light">{state.error}</Text>
        </Card>
      )}

      <ProvideFormFooter
        data={state}
        astroAmount={totalAstro}
        ustAmount={uusd.amount}
        onConfirmClick={onClick}
      />
    </>
  );
};

export default ProvideFormInitial;
