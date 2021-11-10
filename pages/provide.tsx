import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { Flex } from "@chakra-ui/react";

import Provide from "components/pages/Provide";

const ProvidePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Astroport</title>
      </Head>
      <Flex>
        <Provide />
      </Flex>
    </>
  );
};

export default ProvidePage;
