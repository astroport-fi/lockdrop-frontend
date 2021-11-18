import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { Flex } from "@chakra-ui/react";

import Lock from "components/pages/Lock";

const LockPage: NextPage = () => {
  const { query } = useRouter();
  const lpToken = query?.lpToken as string;

  if (lpToken == null) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Astroport</title>
      </Head>
      <Flex>
        <Lock lpToken={lpToken} />
      </Flex>
    </>
  );
};

export default LockPage;
