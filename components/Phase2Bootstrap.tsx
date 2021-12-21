import React from "react";
import {
  Box,
  Flex,
  Text,
  Stack,
  VStack,
  HStack,
  Divider,
  Heading,
  StackDivider,
  Image,
  UnorderedList,
  ListItem,
  Accordion,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import { fromTerraAmount } from "@arthuryeti/terra";

import { useAstroApp } from "modules/common";
import {
  useUserInfo,
  useConfig,
  useAstroBalance,
  useTotalAstroRewards,
} from "modules/auction";
import { useAirdopState } from "modules/airdrop";

import KPITitle from "components/KPITitle";
import CardHeader from "components/CardHeader";
import Card from "components/Card";
import AccordionExpand from "components/AccordionExpand";
import FrameBorder from "components/FrameBorder";
import Timer from "components/Timer";
import PlusIcon from "components/icons/PlusIcon";

const Phase2Bootstrap = () => {
  const { phase2StartDate, phase2EndDate } = useAstroApp();
  const config = useConfig();
  const userInfo = useUserInfo();
  const { astroBalance, lockdropBalance, airdropBalance } = useAstroBalance();
  const state = useAirdopState();
  const totalAstroRewards = useTotalAstroRewards();

  return (
    <Box>
      <CardHeader label="Phase 2: ASTRO-UST Bootstrapping Pool" />
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
                label="My available ASTRO balance"
                value={`${fromTerraAmount(astroBalance, "0,0.00")} ASTRO`}
                tooltip={
                  <VStack align="stretch">
                    <HStack justify="space-between">
                      <Text>ASTRO from Airdrop</Text>
                      <Text opacity={0.6}>
                        {fromTerraAmount(airdropBalance, "0,0.00")}
                      </Text>
                    </HStack>
                    <HStack justify="space-between">
                      <Text>ASTRO from Phase 1</Text>
                      <Text opacity={0.6}>
                        {fromTerraAmount(lockdropBalance, "0,0.00")}
                      </Text>
                    </HStack>
                  </VStack>
                }
              />
            </Box>
            <Box pr={[null, null, null, null, "24"]}>
              <KPITitle
                label="My total estimated ASTRO upon launch"
                value={`${fromTerraAmount(totalAstroRewards, "0,0.00")} ASTRO`}
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
              phase="2"
              phaseStartDate={phase2StartDate}
              phaseEndDate={phase2EndDate}
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
                label="Total ASTRO rewards allocated to ASTRO-UST Bootstrapping Pool"
                value={`${fromTerraAmount(
                  config?.astro_incentive_amount,
                  "0,0.00"
                )} ASTRO`}
              />
            </Box>
            <Box pl={[null, null, null, null, "24"]}>
              <KPITitle
                label="Total ASTRO rewards allocated
                to airdrop"
                value={`${fromTerraAmount(
                  state?.total_airdrop_size,
                  "0,0.00"
                )} ASTRO`}
              />
            </Box>
          </VStack>
        </Stack>
        <Accordion allowToggle variant="primary">
          <AccordionItem border="0">
            {({ isExpanded }) => (
              <>
                <AccordionPanel>
                  <Box px={["6", null, null, "12"]}>
                    <Box mx={["-10", null, null, "-16"]}>
                      <Divider />
                    </Box>
                    <Box pt="8" pb="12">
                      <VStack align="stretch" spacing="8">
                        <Box>
                          <Heading
                            as="h2"
                            fontFamily="WhyteInktrap"
                            fontSize="lg"
                            my="2"
                          >
                            Step 1: Check which of your Terra addresses qualify
                            for the airdrop
                          </Heading>
                          <Box w={["100%", null, null, "70%", "50%"]}>
                            <Text variant="content">
                              You can deposit your airdropped ASTRO tokens in
                              the ASTRO-UST bootstrapping pool. If you do not
                              deposit your ASTRO tokens in the ASTRO-UST pool
                              during Phase 2, you can claim them upon
                              Astroport’s launch.
                            </Text>
                          </Box>
                        </Box>
                        <Box>
                          <Heading
                            as="h2"
                            fontFamily="WhyteInktrap"
                            fontSize="lg"
                            my="2"
                          >
                            Step 2: Lock Your Liquidity
                          </Heading>
                          <Box w={["100%", null, null, "70%", "50%"]}>
                            <Text variant="content">
                              Lock liquidity in the ASTRO-UST bootstrapping pool
                              to earn the following incentives:
                            </Text>
                          </Box>
                        </Box>
                      </VStack>
                      <Box w={[null, null, null, "85%", "70%"]} mt="8" mb="12">
                        <FrameBorder>
                          <Stack
                            direction={["column", null, "row"]}
                            justify="flex-start"
                            spacing="6"
                            divider={
                              <PlusIcon
                                w={["100%", null, "6"]}
                                color="white"
                                border="0"
                                className={[null, null, "plusTranslate"]}
                              />
                            }
                          >
                            <VStack flex="1" spacing={["2", null, "6"]}>
                              <Flex h="100px" align="center" justify="center">
                                <Image
                                  src="/move-liquidity-1.png"
                                  srcSet="/move-liquidity-1@2x.png 2x"
                                  alt=""
                                />
                              </Flex>
                              <Text
                                variant="content"
                                textAlign="center"
                                fontSize="13px"
                              >
                                An additional one-time reward in ASTRO tokens,
                                which will be transferable upon launch
                              </Text>
                            </VStack>
                            <VStack flex="1" spacing="6">
                              <Flex h="100px" align="center" justify="center">
                                <Image
                                  src="/move-liquidity-2.png"
                                  srcSet="/move-liquidity-2@2x.png 2x"
                                  alt=""
                                />
                              </Flex>
                              <Text
                                variant="content"
                                textAlign="center"
                                fontSize="13px"
                              >
                                Ongoing pool fees from the ASTRO-UST pool after
                                lauch
                              </Text>
                            </VStack>
                            <VStack flex="1" spacing="6">
                              <Flex h="100px" align="center" justify="center">
                                <Image
                                  src="/move-liquidity-3.png"
                                  srcSet="/move-liquidity-3@2x.png 2x"
                                  alt=""
                                />
                              </Flex>
                              <Text
                                variant="content"
                                textAlign="center"
                                fontSize="13px"
                              >
                                Ongoing ASTRO pool incentives
                              </Text>
                            </VStack>
                          </Stack>
                        </FrameBorder>
                      </Box>
                      <Heading
                        as="h2"
                        fontFamily="WhyteInktrap"
                        fontSize="lg"
                        mt="8"
                        mb="2"
                      >
                        Timeline Phase 2
                      </Heading>
                      <Flex
                        direction={["column", null, "row"]}
                        align="flex-end"
                        flexWrap="wrap"
                      >
                        <Box
                          width={["100%", null, "60%"]}
                          order={1}
                          mt={["6", null, "0"]}
                        >
                          <Box
                            borderRight={["0px", null, "1px"]}
                            borderBottom="1px"
                            pb="1px"
                          >
                            <Box
                              borderLeft={["0px", null, "1px"]}
                              textAlign="center"
                              py="1"
                            >
                              <Text fontFamily="WhyteInktrap">Day 1–5</Text>
                            </Box>
                            <HStack
                              align="stretch"
                              spacing="1px"
                              h="5"
                              fontSize="12px"
                              color="black"
                              fontWeight="700"
                            >
                              <Flex
                                justify="center"
                                align="center"
                                bg="white"
                                flex="1"
                              >
                                1
                              </Flex>
                              <Flex
                                justify="center"
                                align="center"
                                bg="white"
                                flex="1"
                              >
                                2
                              </Flex>
                              <Flex
                                justify="center"
                                align="center"
                                bg="white"
                                flex="1"
                              >
                                3
                              </Flex>
                              <Flex
                                justify="center"
                                align="center"
                                bg="white"
                                flex="1"
                              >
                                4
                              </Flex>
                              <Flex
                                justify="center"
                                align="center"
                                bg="white"
                                flex="1"
                              >
                                5
                              </Flex>
                            </HStack>
                          </Box>
                        </Box>
                        <Box
                          width={["100%", null, "60%"]}
                          mt={["0", null, "4"]}
                          order={[2, null, 4]}
                          alignSelf={[null, null, "flex-start"]}
                        >
                          <Text
                            textAlign="center"
                            variant="content"
                            px={["0", "8", null]}
                          >
                            Deposits of ASTRO and/or UST are possible during the
                            first 5 days, but only UST can be withdrawn.
                          </Text>
                          <VStack
                            spacing="8"
                            pt={["6", null, "16"]}
                            pr={["0", null, "16"]}
                          >
                            <Box>
                              <Text variant="content">
                                Phase 2 lasts for seven days during which you
                                can provide ASTRO and/or UST to the pool for the
                                first 5 days. Be aware that you can not withdraw
                                your ASTRO tokens once they’ve been deposited.
                                <br />
                                <br />
                                The height of your ASTRO rewards is based on the
                                final amounts in the ASTRO-UST bootstrapping
                                pool when phase 2 ends.
                              </Text>
                            </Box>
                            {/* <Box>
                              <Heading
                                as="h2"
                                fontFamily="WhyteInktrap"
                                fontSize="lg"
                                my="2"
                              >
                                Unlocking
                              </Heading>
                              <Text variant="content">
                                You can unlock your locked LP positions at any
                                time once Astroport is live, but if you unlock
                                prematurely you have to return all your ASTRO
                                rewards.
                              </Text>
                            </Box> */}
                          </VStack>
                        </Box>
                        <Box
                          width={["100%", null, "25%"]}
                          order={[3, null, 2]}
                          mt={["12", null, "0"]}
                        >
                          <Box borderBottom="1px" pb="1px">
                            <Box textAlign="center" py="1">
                              <Text fontFamily="WhyteInktrap">Day 6–7</Text>
                            </Box>
                            <HStack
                              spacing="1px"
                              align="stretch"
                              h="5"
                              fontSize="12px"
                              color="white"
                              fontWeight="700"
                              ml="1px"
                            >
                              <Flex
                                justify="center"
                                align="center"
                                bg="brand.purple"
                                flex="1"
                                opacity="0.7"
                              >
                                6
                              </Flex>
                              <Flex
                                justify="center"
                                align="center"
                                bg="brand.purple"
                                flex="1"
                                opacity="0.7"
                              >
                                7
                              </Flex>
                            </HStack>
                          </Box>
                        </Box>
                        <Box
                          width={["100%", null, "15%"]}
                          pl={[null, null, "2px"]}
                          order={[5, null, 3]}
                          mt={["12", null, "0"]}
                        >
                          <Flex direction="column" align="center" pb="2px">
                            <Image
                              src="/astrolaunch.png"
                              srcSet="/astrolaunch@2x.png 2x"
                              alt=""
                              mb="2"
                              position="relative"
                            />
                            <HStack
                              align="stretch"
                              spacing="1px"
                              h="5"
                              fontSize="12px"
                              width="100%"
                            >
                              <Flex
                                justify="center"
                                align="center"
                                bg="linear-gradient(90deg, #2450DD 50%, #1B9ED4 100%);"
                                flex="1"
                              ></Flex>
                            </HStack>
                          </Flex>
                        </Box>
                        <Box
                          width={["100%", null, "25%"]}
                          order={[4, null, 5]}
                          mt={["12", null, "0"]}
                          alignSelf={[null, null, "flex-start"]}
                        >
                          <Box
                            h={["4", null, "8"]}
                            borderRight={[null, null, "1px"]}
                            mt={[null, null, "6"]}
                            mb="-2"
                          ></Box>
                          <Image
                            src="/graph.png"
                            alt=""
                            maxWidth={["90%", "60%", "100%"]}
                            mx="auto"
                          />
                          <Box
                            width={["100%", null, "120%"]}
                            mt={["8", null, "4"]}
                          >
                            <UnorderedList variant="content">
                              <ListItem>
                                Deposits close at the end of Day 5.
                              </ListItem>
                              <ListItem>
                                On Day 6, users can withdraw 50% of their UST.
                              </ListItem>
                              <ListItem>
                                On Day 7, the final day, the max withdrawable
                                amount decreases linearly, starting at 50% and
                                decreasing to 0% at the end of Phase 2.
                              </ListItem>
                              <ListItem>
                                <strong>
                                  Be aware: Only 1 withdrawal per position can
                                  be made during the last 2 days, after deposits
                                  are disabled.
                                </strong>
                              </ListItem>
                            </UnorderedList>
                          </Box>
                        </Box>
                        <Box
                          width={["100%", null, "15%"]}
                          order={6}
                          mt="6"
                          alignSelf={[null, null, "flex-start"]}
                        >
                          <Text textAlign="center" variant="content">
                            Phase 3 starts
                          </Text>
                        </Box>
                        <Box width={["100%", null, "60%"]} order={7} mt="10">
                          <Stack
                            align={["stretch", null, null, "flex-end"]}
                            mx="-5"
                            direction={["column", null, null, "row"]}
                            spacing={["8", null, null, "0"]}
                          >
                            <Box flex="1" px="5">
                              <Heading
                                as="h2"
                                fontFamily="WhyteInktrap"
                                fontSize="lg"
                                my="2"
                              >
                                Unlocking process
                              </Heading>
                              <Text variant="content">
                                All liquidity provided to the ASTRO-UST pool
                                will unlock linearly over 3 months. When Phase 2
                                ends, Astroport will launch and unlocked ASTRO
                                tokens will be fully transferable.
                              </Text>
                            </Box>
                            <Box flex="1" px="5">
                              <Image
                                src="/withdrawable-amount.png"
                                srcSet="/withdrawable-amount@2x.png 2x"
                                alt=""
                                width="100%"
                              />
                            </Box>
                          </Stack>
                        </Box>
                      </Flex>
                    </Box>
                    <Box mx={["-10", null, null, "-16"]}>
                      <Divider />
                    </Box>
                  </Box>
                </AccordionPanel>
                <AccordionExpand isExpanded={isExpanded} />
              </>
            )}
          </AccordionItem>
        </Accordion>
      </Card>
    </Box>
  );
};

export default Phase2Bootstrap;
