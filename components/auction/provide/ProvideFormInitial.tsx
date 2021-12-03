import React, { FC, useMemo } from "react";
import { Box, Text, Link } from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";
import { num } from "@arthuryeti/terra";

import { ProvideState } from "modules/auction";
import { useUserInfo } from "modules/lockdrop";

import Card from "components/Card";
import AmountInput from "components/AmountInput";
import ProvideFormFooter from "components/auction/provide/ProvideFormFooter";

type Props = {
  state: ProvideState;
  onClick: () => void;
};

const ProvideFormInitial: FC<Props> = ({ state, onClick }) => {
  const { control } = useFormContext();
  const userInfo = useUserInfo();

  const balance = useMemo(() => {
    if (userInfo == null) {
      return null;
    }

    return num(userInfo.total_astro_rewards)
      .minus(userInfo.delegated_astro_rewards)
      .toString();
  }, [userInfo]);

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
        <Text variant="light" mb="2">
          ASTRO from Lockdrop
        </Text>
        <Controller
          name="astroLockdrop"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <AmountInput
              balance={balance}
              {...field}
              balanceLabel="In Lockdrop"
              isSingle
            />
          )}
        />
      </Card>

      <Card mt="2">
        <Text variant="light" mb="2">
          ASTRO from Airdrop
        </Text>

        <Controller
          name="astroAirdrop"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <AmountInput {...field} balanceLabel="In Airdrop" isSingle />
          )}
        />
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

      <ProvideFormFooter data={state} onConfirmClick={onClick} />
    </>
  );
};

export default ProvideFormInitial;
