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
        <title>Astroport</title>
      </Head>
      <Container my="12" px={['6', null, '12']} maxWidth="container.xl">
        <LaunchPlan />
        <LaunchTimelineIntro />
      </Container>
    </>
  );
};

export default LaunchPlanPage;
