import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { Flex } from "@chakra-ui/react";

import Lock from "components/pages/Lock";

const PoolPage: NextPage = () => {
  const { query } = useRouter();
  const pair = query?.pair as string;

  if (pair == null) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Astroport</title>
      </Head>
      <Flex>
        <Lock lpToken={pair} />
      </Flex>
    </>
  );
};

export default PoolPage;
