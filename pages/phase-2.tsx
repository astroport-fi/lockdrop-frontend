import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import { Container } from "@chakra-ui/react";

import Phase2 from "components/pages/Phase2";

const Phase2Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>Apollo xAstro Lockdrop</title>
      </Head>
      <Container px={["6", null, "12"]} maxWidth="container.xl">
        <Phase2 />
      </Container>
    </>
  );
};

export default Phase2Page;
