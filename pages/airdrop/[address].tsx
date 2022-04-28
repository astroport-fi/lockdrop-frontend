import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { Flex } from "@chakra-ui/react";

import Airdrop from "components/pages/Airdrop";

const AirdropPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Apollo xAstro Lockdrop</title>
      </Head>
      <Flex>
        <Airdrop />
      </Flex>
    </>
  );
};

export default AirdropPage;
