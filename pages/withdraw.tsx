import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { Flex } from "@chakra-ui/react";

import Withdraw from "components/pages/Withdraw";

const WithdrawPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Astroport</title>
      </Head>
      <Flex>
        <Withdraw />
      </Flex>
    </>
  );
};

export default WithdrawPage;
