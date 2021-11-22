import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import { Container } from "@chakra-ui/react";

// import Swap from "components/pages/Swap";
import LaunchPlan from "components/pages/LaunchPlan";
import LaunchTimelineIntro from "components/LaunchTimelineIntro";

const DashboardPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Astroport</title>
      </Head>
      <Container my="12" px={["6", null, "12"]} maxWidth="container.xl">
        <LaunchPlan />
        <LaunchTimelineIntro />
      </Container>
      {/* <Swap /> */}
      {/* <Dashboard /> */}
    </>
  );
};

export default DashboardPage;
