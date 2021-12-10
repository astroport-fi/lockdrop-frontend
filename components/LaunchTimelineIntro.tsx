import React from "react";
import dayjs from "dayjs";
import {
  Box,
  HStack,
  Flex,
  Text,
  Image,
  StackDivider,
  Stack,
  VStack,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

import { useAstroApp } from "modules/common";

import DateNumber from "components/DateNumber";
import CardHeader from "components/CardHeader";
import Card from "components/Card";

const LaunchTimelineIntro = () => {
  const { phase1StartDate, phase2StartDate } = useAstroApp();
  const endDate = phase1StartDate?.add(14, "day");
  const startPhase1Date = phase1StartDate?.format("DD/MM/YY");
  const startPhase2Date = phase2StartDate?.format("DD/MM/YY");
  const formattedEndDate = endDate?.format("DD/MM/YY");

  function checkToday(index) {
    const today = dayjs();
    return endDate?.subtract(index, "days").isSame(today, "day");
  }

  function printDate(phaseNumber, start, end) {
    const phase = [];

    for (let index = start; index > end; index--) {
      let isToday = checkToday(index);
      if (phaseNumber == 1 && index < 10) {
        phase.push(
          <DateNumber
            day={index}
            bg="brand.purple"
            color="white"
            isToday={isToday}
          />
        );
      } else if (phaseNumber == 2 && index < 3) {
        phase.push(<DateNumber day={index} bg="#83FFCB" isToday={isToday} />);
      } else {
        phase.push(<DateNumber day={index} isToday={isToday} />);
      }
    }
    return phase;
  }

  const phase1 = printDate(1, 14, 7);
  const phase2 = printDate(2, 7, 0);

  return (
    <Box>
      <CardHeader label="Launch Timeline" />
      <Card p={["6", null, null, "12"]}>
        <Stack
          direction={["column", null, null, "row"]}
          mt="3"
          flexWrap="wrap"
          mx="-4"
          spacing={["12", null, null, "0"]}
        >
          <Box flex="2" px="4">
            <VStack align="flex-start" spacing="2" flex="2" mb="6">
              <Text fontSize="20px">Phase 1</Text>
              <Text fontSize="12px">The Lockdrop</Text>
            </VStack>
            <Box>
              <Text
                mb="1"
                fontSize="xs"
                textTransform="uppercase"
                fontWeight="bold"
              >
                Days
              </Text>
              <HStack
                spacing="0"
                align="stretch"
                w="100%"
                height="5"
                mb="1"
                divider={<StackDivider borderColor="#0D1941" />}
                fontWeight="700"
              >
                {phase1}
              </HStack>
              <Box>
                <Text
                  fontSize="12px"
                  color="#6C758F"
                  mb={["0", null, null, "6"]}
                >
                  {startPhase1Date}
                </Text>
                <VStack spacing="6" align="flex-start" fontSize="15px">
                  <Text>
                    Deposit and lock your Terraswap liquidity (LP tokens) on
                    Astroport and get rewarded with ASTRO governance tokens.
                  </Text>
                  <Text>
                    <strong>Here’s how it works</strong>
                    <br />
                    You can “lock” up your Terraswap LP tokens for a fixed
                    duration. In exchange, you’re “dropped” or rewarded with
                    ASTRO tokens when Phase 1 ends (see timeline above). The
                    more LP tokens and the longer you lock them, the more ASTRO
                    you will receive.
                  </Text>
                  <Text>
                    In addition to the initial ASTRO distribution, anyone who
                    locks liquidity on Astroport will also accrue trading fees,
                    ongoing ASTRO emissions and dual rewards where supported.
                  </Text>
                </VStack>
              </Box>
            </Box>
          </Box>
          <Box flex="2" px="4">
            <VStack align="flex-start" spacing="2" flex="2" mb="6">
              <Text fontSize="20px">Phase 2</Text>
              <Text fontSize="12px">The ASTRO-UST Bootstraping Pool</Text>
            </VStack>
            <Box>
              <Text
                mb="1"
                fontSize="xs"
                textTransform="uppercase"
                fontWeight="bold"
              >
                Days
              </Text>
              <HStack
                spacing="0"
                align="stretch"
                w="100%"
                height="5"
                mb="1"
                divider={<StackDivider borderColor="#0D1941" />}
                fontWeight="700"
              >
                {phase2}
              </HStack>
              <Box>
                <Text
                  fontSize="12px"
                  color="#6C758F"
                  mb={["0", null, null, "6"]}
                >
                  {startPhase2Date}
                </Text>
                <VStack spacing="6" align="flex-start" fontSize="15px">
                  <Text>
                    Lock ASTRO and/or UST in the ASTRO-UST bootstrapping pool to
                    earn the following incentives:
                  </Text>
                  <UnorderedList
                    fontWeight="normal"
                    fontSize="15px"
                    paddingLeft="2rem"
                  >
                    <ListItem>
                      An additional one-time reward in ASTRO tokens, which will
                      be transferable upon launch
                    </ListItem>
                    <ListItem>
                      Ongoing pool fees from the ASTRO-UST pool after launch
                    </ListItem>
                    <ListItem>Ongoing ASTRO pool incentives</ListItem>
                  </UnorderedList>
                  <Text>
                    Phase 1 participants can lock their ASTRO in Phase 2. Other
                    participants can pre-claim ASTRO from the airdrop to join
                    Phase 2.
                  </Text>
                  <Text>
                    All liquidity provided to the ASTRO-UST pool will unlock
                    linearly over 3 months. When Phase 2 ends, Astroport
                    launches and unlocked ASTRO tokens will be fully
                    transferable.
                  </Text>
                </VStack>
              </Box>
            </Box>
          </Box>
          <Flex direction="column" flex="1" px="4">
            <Box>
              <VStack align="flex-start" spacing="2" flex="1" mb="6">
                <Text fontSize="20px">Phase 3</Text>
                <Text fontSize="12px">Astroport launch!</Text>
              </VStack>
              <Box pt="22px">
                <HStack spacing="0" align="stretch" w="100%" height="5" mb="1">
                  <Box flex="1" bg="#83FFCB"></Box>
                </HStack>
                <Box>
                  <Text
                    fontSize="12px"
                    color="#6C758F"
                    mb={["0", null, null, "6"]}
                  >
                    {formattedEndDate}
                  </Text>
                </Box>
              </Box>
            </Box>
            <Flex mt={["6", null, null, "auto"]} justify="center">
              <Image
                src="/intro-phase-3.png"
                srcSet="/intro-phase-3@2x.png 2x"
                alt=""
              ></Image>
            </Flex>
          </Flex>
        </Stack>
      </Card>
    </Box>
  );
};

export default LaunchTimelineIntro;
