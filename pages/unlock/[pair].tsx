import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { Flex } from "@chakra-ui/react";

import Unlock from "components/pages/Unlock";
import { useAstroswap } from "modules/common";

const PoolPage: NextPage = () => {
  const { query } = useRouter();
  const { pairs } = useAstroswap();

  const pair =
    pairs &&
    pairs.find(({ contract_addr }) => {
      return query?.pair === contract_addr;
    });

  return (
    <>
      <Head>
        <title>Astroport</title>
      </Head>
      <Flex>{pair != null && <Unlock pair={pair} />}</Flex>
    </>
  );
};

export default PoolPage;
