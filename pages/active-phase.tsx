import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { Container, Flex, Box, Heading } from "@chakra-ui/react";
import dayjs from "dayjs";
import Lottie from "react-lottie";

import { useConfig as useLockdropConfig } from "modules/lockdrop";
import { useConfig as useAuctionConfig } from "modules/auction";

import * as animationData from "libs/animations/loop.json";
import Phase1 from "components/pages/Phase1";
import Phase2 from "components/pages/Phase2";

const ActivePhasePage: NextPage = () => {
  const lockdropConfig = useLockdropConfig();
  const auctionConfig = useAuctionConfig();
  const timestamp = dayjs().unix();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  if (auctionConfig == null || lockdropConfig == null) {
    return null;
  }

  const showPhase2 = timestamp > auctionConfig.init_timestamp;
  const showPhase1 = timestamp > lockdropConfig.init_timestamp && !showPhase2;

  return (
    <>
      <Head>
        <title>Apollo xAstro Lockdrop</title>
      </Head>
      <Container px={["6", null, "12"]} maxWidth="container.xl">
        {showPhase1 && <Phase1 />}
        {showPhase2 && <Phase2 />}
        {!showPhase1 && !showPhase2 && (
          <Box m="0 auto" pt="12">
            <Flex align="center" justify="center" direction="column">
              <Lottie
                options={defaultOptions}
                height={400}
                width={400}
                isStopped={false}
                isPaused={false}
              />
              <Heading color="white" fontWeight="bold">
                Phase 1 opening soon..
              </Heading>
            </Flex>
          </Box>
        )}
      </Container>
    </>
  );
};

export default ActivePhasePage;
