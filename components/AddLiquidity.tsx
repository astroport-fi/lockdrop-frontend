import React from "react";
import {
  Box,
  Flex,
  Button,
  Text,
  VStack,
  Stack,
  StackDivider,
  Image,
} from "@chakra-ui/react";
import Link from "next/link";
import { fromTerraAmount, num } from "@arthuryeti/terra";

import {
  useUserInfo,
  useAuctionState,
  useAstroPrice,
  useAuctionLogic,
  useAuctionMetrics,
} from "modules/auction";

import KPITitle from "components/KPITitle";
import CardHeader from "components/CardHeader";
import Card from "components/Card";
import FrameBorder from "components/FrameBorder";

const AddLiquidity = () => {
  const userInfo = useUserInfo();
  const auctionState = useAuctionState();
  const price = useAstroPrice();
  const logic = useAuctionLogic();
  const metrics = useAuctionMetrics();
  const isLow = num(price).lt("0.01");

  const renderProvideButton = () => {
    if (!logic.canDeposit) {
      return (
        <Button
          as="a"
          variant="primary"
          width="208px"
          isDisabled={!logic.canDeposit}
        >
          Provide Liquidity
        </Button>
      );
    }

    return (
      <Link href="/provide" passHref>
        <Button
          as="a"
          variant="primary"
          width="208px"
          isDisabled={!logic.canDeposit}
        >
          Provide Liquidity
        </Button>
      </Link>
    );
  };

  const renderWithdrawButton = () => {
    if (!logic.canWithdraw) {
      return (
        <Button
          as="a"
          variant="secondary"
          width="208px"
          isDisabled={!logic.canWithdraw}
        >
          Withdraw UST
        </Button>
      );
    }

    return (
      <Link href="/withdraw" passHref>
        <Button
          as="a"
          variant="secondary"
          width="208px"
          isDisabled={!logic.canWithdraw}
        >
          Withdraw UST
        </Button>
      </Link>
    );
  };

  return (
    <Box>
      <CardHeader label="Add liquidity to the ASTRO-UST bootstrapping pool" />
      <Card px={["6", null, null, "12"]} py="12">
        <VStack
          align="stretch"
          spacing="10"
          px="5"
          divider={<StackDivider borderColor="white" opacity="0.25" />}
          textAlign={["center", null, "left"]}
          flex={[null, null, null, "1"]}
        >
          <Stack
            direction={["column", null, "row"]}
            align="center"
            justify="space-between"
            mx="-5"
            flexWrap="wrap"
            spacing={["10", null, "0"]}
          >
            <VStack
              spacing={10}
              align={["center", null, "flex-start"]}
              px="5"
              order={1}
              w={["100%", "50%", "auto"]}
            >
              <KPITitle
                value={`${fromTerraAmount(
                  auctionState?.total_astro_delegated,
                  "0,0.00"
                )} ASTRO`}
                label="Total ASTRO in bootstrapping pool"
              />
              <KPITitle
                value={`+${metrics?.bonusMultiplier.toFixed(2)}%`}
                titleColor="brand.turquoise"
                label="Current upfront ASTRO reward for depositing ASTRO"
                maxWidth={[null, null, null, "190px"]}
              />
              <KPITitle
                value={`${metrics?.bonusPerAstro.toFixed(2)}`}
                titleColor="brand.turquoise"
                label="Current ASTRO reward per 1,000 ASTRO tokens deposited"
                maxWidth={[null, null, null, "190px"]}
              />
            </VStack>
            <Flex
              justify="center"
              px="5"
              order={[2, null, 3, null, 2]}
              w={["100%", null, "100%", null, "auto"]}
            >
              <Box
                position="relative"
                flex="1"
                maxWidth="440px"
                mt={[null, null, "10", null, 0]}
              >
                <Box
                  position="absolute"
                  left="0"
                  bottom="0"
                  transform="translate(-50%, 1rem)"
                  zIndex={10}
                >
                  <Image
                    src="/coin-left.png"
                    srcSet="/coin-left@2x.png 2x"
                    alt=""
                  />
                </Box>
                <Box
                  position="absolute"
                  right="0"
                  top="0"
                  transform="translate(50%, -1rem)"
                  zIndex={10}
                >
                  <Image
                    src="/coin-right.png"
                    srcSet="/coin-right@2x.png 2x"
                    alt=""
                  />
                </Box>
                <FrameBorder>
                  <VStack>
                    <Text variant="spaced" color="white">
                      Current Ratio
                    </Text>
                    <Text
                      color="brand.turquoise"
                      fontSize={["16px", null, "32px"]}
                      textAlign="center"
                    >
                      1 ASTRO {isLow ? "< 0.01" : "= " + price} UST
                    </Text>
                    <Text variant="spaced" color="white" opacity="0.4">
                      If all remains equal
                    </Text>
                  </VStack>
                </FrameBorder>
              </Box>
            </Flex>
            <VStack
              spacing={10}
              align={["center", null, "flex-end"]}
              textAlign={["center", null, "right"]}
              px="5"
              order={[3, null, 2, null, 3]}
              w={["100%", "50%", "auto"]}
            >
              <KPITitle
                value={`${fromTerraAmount(
                  auctionState?.total_ust_delegated,
                  "0,0.00"
                )} UST`}
                label="Total UST in bootstrapping pool"
              />
              <KPITitle
                value={`+${metrics?.bonusMultiplier.toFixed(2)}%`}
                titleColor="brand.turquoise"
                label="Current upfront ASTRO reward for depositing UST"
                maxWidth={[null, null, null, "190px"]}
              />
              <KPITitle
                value={`${metrics?.bonusPerUst.toFixed(2)}`}
                titleColor="brand.turquoise"
                label="Current ASTRO reward per 1,000 UST deposited"
                maxWidth={[null, null, null, "190px"]}
              />
            </VStack>
          </Stack>
          <Stack
            direction={["column", null, "row"]}
            align={["center", null, "flex-start"]}
            justify="space-between"
            mx="-5"
            flexWrap="wrap"
            spacing={["10", null, "0"]}
          >
            <Box px="5" order={1} w={["100%", "auto"]}>
              <KPITitle
                value={`${fromTerraAmount(
                  userInfo?.astro_delegated,
                  "0,0.00"
                )} ASTRO`}
                label="My ASTRO in bootstrapping pool"
              />
            </Box>
            <VStack
              spacing="6"
              px="5"
              order={[2, null, 3, null, 2]}
              w={["100%", null, null, null, "auto"]}
            >
              <Box
                textAlign="center"
                maxWidth="250px"
                mt={[null, null, "8", null, "0"]}
              >
                <KPITitle
                  value={`${fromTerraAmount(
                    userInfo?.auction_incentive_amount,
                    "0,0.00"
                  )} ASTRO`}
                  label="My one time estimated ASTRO rewards from ASTRO-UST bootstrapping pool"
                />
              </Box>
              <Stack
                direction={["column", null, "row"]}
                spacing={["4", null, "7"]}
              >
                {renderProvideButton()}
                {renderWithdrawButton()}
              </Stack>
            </VStack>
            <Box
              textAlign={["center", null, "right"]}
              px="5"
              order={[3, null, 2, null, 3]}
              w={["100%", "auto"]}
            >
              <KPITitle
                value={`${fromTerraAmount(
                  userInfo?.ust_delegated,
                  "0,0.00"
                )} UST`}
                label="My UST in bootstrapping pool"
              />
            </Box>
          </Stack>
        </VStack>
      </Card>
    </Box>
  );
};

export default AddLiquidity;
