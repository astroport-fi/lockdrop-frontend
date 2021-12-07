import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { Container } from "@chakra-ui/react";
import dayjs from "dayjs";

import { useConfig as useLockdropConfig } from "modules/lockdrop";
import { useConfig as useAuctionConfig } from "modules/auction";

import Phase1 from "components/pages/Phase1";
import Phase2 from "components/pages/Phase2";

const ActivePhasePage: NextPage = () => {
  const lockdropConfig = useLockdropConfig();
  const auctionConfig = useAuctionConfig();
  const timestamp = dayjs().unix();

  if (auctionConfig == null || lockdropConfig == null) {
    return null;
  }

  const showPhase2 = timestamp > auctionConfig.init_timestamp;
  const showPhase1 = timestamp > lockdropConfig.init_timestamp && !showPhase2;

  return (
    <>
      <Head>
        <title>Astroport</title>
      </Head>
      <Container px={["6", null, "12"]} maxWidth="container.xl">
        {showPhase1 && <Phase1 />}
        {showPhase2 && <Phase2 />}
      </Container>
    </>
  );
};

export default ActivePhasePage;
