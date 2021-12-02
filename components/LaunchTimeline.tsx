import React, { FC } from "react";
import dayjs from "dayjs";
import {
  Box,
  HStack,
  Flex,
  Text,
  Image,
  StackDivider,
  Stack,
} from "@chakra-ui/react";

import DateNumber from "components/DateNumber";
import CardHeader from "components/CardHeader";
import Card from "components/Card";

type Props = {
  phase: number;
};

const LaunchTimeline: FC<Props> = ({ phase }) => {
  const todayDate = dayjs().format("D");
  const endDate = dayjs("2021-12-15:00:00.000Z");
  const endFormattedDate = endDate.format("DD/MM/YY");
  const startPhase1Date = endDate.subtract(14, "days").format("DD/MM/YY");
  const startPhase2Date = endDate.subtract(7, "days").format("DD/MM/YY");

  function checkToday(index) {
    return endDate.subtract(index, "days").format("D") === todayDate;
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

      <Card px={["6", null, null, "12"]}>
        <Flex align="center" mt="-24" display={["none", null, null, "flex"]}>
          <Flex justify="center" flex="2">
            <Image src="/phase-1.png" srcSet="/phase-1@2x.png 2x" alt="" />
          </Flex>
          <Flex justify="center" flex="2">
            <Image src="/phase-2.png" srcSet="/phase-2@2x.png 2x" alt="" />
          </Flex>
          <Flex justify="center" flex="1">
            <Image
              src="/astrolaunch.png"
              srcSet="/astrolaunch@2x.png 2x"
              alt=""
            />
          </Flex>
        </Flex>
        <Stack
          direction={["column", null, null, "row"]}
          mt="3"
          flexWrap="wrap"
          mx="-4"
          spacing={["8", null, null, "0"]}
        >
          <Box flex="2" px="4">
            <Flex
              justify="center"
              display={["flex", null, null, "none"]}
              mb="4"
            >
              <Image src="/phase-1.png" srcSet="/phase-1@2x.png 2x" alt="" />
            </Flex>
            <Box opacity={phase != 1 && "0.4"}>
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
                  color={phase == 1 && "#6C758F"}
                  mb={["0", null, null, "3"]}
                >
                  {startPhase1Date}
                </Text>
                <Text fontSize="20px">Phase 1</Text>
                <Text fontSize="14px">Lockdrop</Text>
              </Box>
            </Box>
          </Box>
          <Box flex="2" px="4">
            <Flex
              justify="center"
              display={["flex", null, null, "none"]}
              mb="4"
            >
              <Image
                src="/phase-2.png"
                srcSet="/phase-2@2x.png 2x"
                alt=""
              ></Image>
            </Flex>
            <Box opacity={phase != 2 && "0.4"}>
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
                  color={phase == 2 && "#6C758F"}
                  mb={["0", null, null, "3"]}
                >
                  {startPhase2Date}
                </Text>
                <Text fontSize="20px">Phase 2</Text>
                <Text fontSize="14px">
                  Reserve Airdrop + add liquidity to the ASTRO - UST bootstrap
                  pool
                </Text>
              </Box>
            </Box>
          </Box>
          <Box flex="1" px="4">
            <Flex
              justify="center"
              display={["flex", null, null, "none"]}
              mb="4"
            >
              <Image
                src="/astrolaunch.png"
                srcSet="/astrolaunch@2x.png 2x"
                alt=""
              ></Image>
            </Flex>
            <Box opacity={phase != 3 && "0.4"} pt="22px">
              <HStack spacing="0" align="stretch" w="100%" height="5" mb="1">
                <Box flex="1" bg="#83FFCB"></Box>
              </HStack>
              <Box>
                <Text
                  fontSize="12px"
                  color={phase == 3 && "#6C758F"}
                  mb={["0", null, null, "3"]}
                >
                  {endFormattedDate}
                </Text>
                <Text fontSize="20px">ASTRO Launch</Text>
                <Text fontSize="14px">
                  Claim your airdrops and add liquidty to pools.
                </Text>
              </Box>
            </Box>
          </Box>
        </Stack>
      </Card>
    </Box>
  );
};

export default LaunchTimeline;
