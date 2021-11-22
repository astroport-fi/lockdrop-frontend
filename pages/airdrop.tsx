import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import { Container } from "@chakra-ui/react";

// import Swap from "components/pages/Swap";
import Airdrop from "components/pages/Airdrop";

const AirdropPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Astroport</title>
      </Head>
      <Container px={["6", null, "12"]} maxWidth="container.md">
        <Airdrop />
      </Container>
      {/* <Swap /> */}
      {/* <Dashboard /> */}
    </>
  );
};

export default AirdropPage;
