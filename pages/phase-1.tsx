import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { Container } from "@chakra-ui/react";

import Phase1 from "components/pages/Phase1";

const Phase1Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>Astroport</title>
      </Head>
      <Container px={["6", null, "12"]} maxWidth="container.xl">
        <Phase1 />
      </Container>
    </>
  );
};

export default Phase1Page;
