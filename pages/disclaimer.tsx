import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { Container } from "@chakra-ui/react";

import Disclaimer from "components/pages/Disclaimer";

const Phase1Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>Apollo xAstro Lockdrop</title>
      </Head>
      <Container px={["6", null, "12"]} maxWidth="container.xl">
        <Disclaimer />
      </Container>
    </>
  );
};

export default Phase1Page;
