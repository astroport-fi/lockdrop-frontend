import React from 'react';
import Head from 'next/head';
import { NextPage } from 'next';

import { Container } from '@chakra-ui/react';

import LaunchPlan from 'components/pages/LaunchPlan';
import LaunchTimelineIntro from 'components/LaunchTimelineIntro';

const LaunchPlanPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Apollo xAstro Lockdrop</title>
      </Head>
      <Container my="32px" maxWidth="container.xl">
        <LaunchPlan />
        <LaunchTimelineIntro />
      </Container>
    </>
  );
};

export default LaunchPlanPage;
