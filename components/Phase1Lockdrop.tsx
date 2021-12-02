import React from "react";
import { Box, Stack, VStack, StackDivider } from "@chakra-ui/react";
import numeral from "numeral";

import {
  useUserInfo,
  useTotalLiquidityAdded,
  useMyLiquidityAdded,
  useLockState,
} from "modules/lockdrop";
import { useAstroApp } from "modules/common";

import KPITitle from "components/KPITitle";
import Card from "components/Card";
import CardHeader from "components/CardHeader";
import Phase1LockdropAccordion from "components/Phase1LockdropAccordion";
import Timer from "components/Timer";

const Phase1Lockdrop = () => {
  const { phase1StartDate, phase1EndDate } = useAstroApp();
  const lockState = useLockState();
  const userInfo = useUserInfo();
  const total = numeral(lockState?.astroRewardsAllocated).format("0,0.00");
  const mine = numeral(userInfo?.estimatedAstroReward).format("0,0.00");
  const totalLiquidityAdded = useTotalLiquidityAdded();
  const myLiquidityAdded = useMyLiquidityAdded();
  const totalLiquidityAddedFormatted =
    numeral(totalLiquidityAdded).format("0,0.00");
  const myLiquidityAddedFormatted = numeral(myLiquidityAdded).format("0,0.00");

  return (
    <Box>
      <CardHeader label="Phase 1 : Lockdrop" />
      <Card noPadding pt="12" pb="8">
        <Stack
          mx="-5"
          justify={["center", null, null, "space-between"]}
          direction={["column", null, "row", null]}
          flexWrap="wrap"
          align="stretch"
          px={["6", null, null, "12"]}
          pb="10"
          spacing={["12", null, "0", null]}
        >
          <VStack
            align={["center", null, "flex-start", null]}
            spacing="6"
            px="5"
            divider={<StackDivider borderColor="white" opacity="0.25" />}
            width={["100%", null, "50%", null, "auto"]}
            textAlign={["center", null, "left", null]}
            flex={[null, null, null, "1"]}
          >
            <Box pr={[null, null, null, null, "24"]}>
              <KPITitle
                label="Total ASTRO rewards allocated to lockdrop"
                value={total}
                asset="ASTRO"
              />
            </Box>
            <Box pr={[null, null, null, null, "24"]}>
              <KPITitle
                label="My estimated ASTRO rewards"
                value={mine}
                asset="ASTRO"
              />
            </Box>
          </VStack>
          <VStack
            spacing="10"
            px="5"
            justify="flex-start"
            align="stretch"
            order={[2, null, 3, 2]}
            flex={[null, null, null, "1"]}
          >
            <Timer
              phase="1"
              phaseStartDate={phase1StartDate}
              phaseEndDate={phase1EndDate}
            />
          </VStack>
          <VStack
            align={["center", null, "flex-end", null]}
            spacing="6"
            px="5"
            divider={<StackDivider borderColor="white" opacity="0.25" />}
            order={[3, null, 2, null, 3]}
            width={["100%", null, "50%", null, "auto"]}
            textAlign={["center", null, "right", null]}
            flex={[null, null, null, "1"]}
          >
            <Box pl={[null, null, null, null, "24"]}>
              <KPITitle
                label="Total liquidity added to lockdrop"
                value={`${totalLiquidityAddedFormatted} UST`}
              />
            </Box>
            <Box pl={[null, null, null, null, "24"]}>
              <KPITitle
                label="My liquidity added to lockdrop"
                value={`${myLiquidityAddedFormatted} UST`}
              />
            </Box>
          </VStack>
        </Stack>
        <Phase1LockdropAccordion />
      </Card>
    </Box>
  );
};

export default Phase1Lockdrop;
