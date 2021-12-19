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
  Image,
  UnorderedList,
  ListItem,
  Accordion,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";

import AccordionExpand from "components/AccordionExpand";
import FrameBorder from "components/FrameBorder";
import PlusIcon from "components/icons/PlusIcon";

const Phase1LockdropAccordion = () => {
  return (
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
                  <Heading
                    as="h2"
                    fontFamily="WhyteInktrap"
                    fontSize="lg"
                    my="2"
                  >
                    Migrate and lock liquidity from Terraswap
                  </Heading>
                  <Box w={["100%", null, null, "70%", "50%"]}>
                    <Text variant="content">
                      During the Phase 1, you can deposit and lock your
                      Terraswap liquidity (LP tokens) on Astroport. In doing so
                      you receive:
                    </Text>
                  </Box>
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
                            A one-time reward in ASTRO tokens which becomes
                            transferrable upon Astroport’s launch or can be used
                            in Phase 2 to earn even more ASTRO tokens
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
                            Ongoing fees from the underlying LP positions
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
                            Ongoing dual rewards in ASTRO + project tokens when
                            available (eg. MIR, ANC, MINE, etc.)
                          </Text>
                        </VStack>
                      </Stack>
                    </FrameBorder>
                  </Box>
                  <VStack
                    align="flex-start"
                    spacing="4"
                    w={["100%", null, null, "70%", "60%"]}
                  >
                    <Text variant="content">
                      The more liquidity you lock and the longer you lock it,
                      the more ASTRO you will receive. Be aware that certain
                      pools receive a higher amount of ASTRO than others as
                      shown in the table at the bottom of the page.
                    </Text>
                    <Text variant="content">
                      <strong>
                        You can have a maximum of 10 total positions open at any
                        given time during phase 1.
                      </strong>
                    </Text>
                  </VStack>
                  <Heading
                    as="h2"
                    fontFamily="WhyteInktrap"
                    fontSize="lg"
                    mt="8"
                  >
                    Timeline Phase 1
                  </Heading>
                  <Flex
                    direction={["column", null, "row"]}
                    align="flex-end"
                    flexWrap="wrap"
                    mt={[null, null, "-10"]}
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
                        LP token deposits and withdrawals are allowed during the
                        first 5 days
                      </Text>
                      <VStack
                        spacing="8"
                        pt={["6", null, "16"]}
                        pr={["0", null, "16"]}
                      >
                        <Box>
                          <Heading
                            as="h2"
                            fontFamily="WhyteInktrap"
                            fontSize="lg"
                            my="2"
                          >
                            Calculation of Rewards
                          </Heading>
                          <Text variant="content">
                            Users can deposit their liquidity at any time during
                            the first 5 days of Phase 1, and the time of the
                            deposit will not impact the amount of ASTRO received
                            (e.g. a deposit on Day 1 is the same as a deposit on
                            Day 5). Each user’s share of ASTRO rewards is
                            calculated pro rata based on the amount of liquidity
                            provided in each pool at the time of the snapshot at
                            the end of Phase 1. The more liquidity provided and
                            the longer it’s locked for, the more ASTRO you will
                            receive. Upon conclusion of Phase 1, Phase 2 will
                            begin with the ASTRO-UST liquidity bootstrapping
                            pool opening for deposits.
                            {/* <Link
                              color="#85F7F0"
                              fontWeight="bold"
                              href="/phase-2"
                            >
                              Learn more about Phase 2
                            </Link> */}
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
                            You can unlock your locked LP positions at any time
                            once Astroport is live, but if you unlock
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
                          src="/astrolaunch-2.png"
                          srcSet="/astrolaunch-2@2x.png 2x"
                          alt=""
                          mb="-10"
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
                            bg="linear-gradient(90deg, #83FFCB 5.9%, #0D1941 90.97%);"
                            flex="1"
                          />
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
                      />
                      <Image
                        src="/graph.png"
                        alt=""
                        maxWidth={["90%", "60%", "100%"]}
                        mx="auto"
                      />
                      <Box width={["100%", null, "120%"]} mt={["8", null, "4"]}>
                        <UnorderedList variant="content">
                          <ListItem>
                            Deposits close at the end of Day 5.
                          </ListItem>
                          <ListItem>
                            On Day 6, users can withdraw up to 50% of their
                            deposits.
                          </ListItem>
                          <ListItem>
                            On Day 7, the final day, the max withdrawable amount
                            decreases linearly, starting at 50% and decreasing
                            to 0% at the end of the lockdrop.
                          </ListItem>
                          <ListItem>
                            <strong>
                              Be aware: Only 1 withdrawal per position can be
                              made during the last 2 days, after deposits are
                              disabled.
                            </strong>
                          </ListItem>
                        </UnorderedList>
                      </Box>
                    </Box>
                    <Box
                      width={["100%", null, "15%"]}
                      order={6}
                      mt="10"
                      alignSelf={[null, null, "flex-start"]}
                    >
                      <Text textAlign="center" variant="content">
                        Phase 2 starts
                      </Text>
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
  );
};

export default Phase1LockdropAccordion;
