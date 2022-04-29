import React from 'react';
import dayjs from 'dayjs';

import { useAstroApp } from 'modules/common';

import LaunchTimeline from 'components/LaunchTimeline';
import Phase2Bootstrap from 'components/Phase2Bootstrap';
import AddLiquidity from 'components/AddLiquidity';
import AstroAirdrop from 'components/AstroAirdrop';
import Table from 'components/Table';
import Card from 'components/Card';
import LockdropPageHeader from 'components/LockdropPageHeader';
import LockdropOverview from 'components/LockdropOverview';
import MyxAstroTable from 'components/MyxAstroTable';
import MyLockdropDeposits from 'components/MyLockdropDeposits';
import Stack from '@mui/material/Stack';
import { white60 } from '../../theme/mui-theme';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const Phase2 = () => {
  const { phase2EndDate } = useAstroApp();
  const phase2EndTimestamp = phase2EndDate?.unix();
  const timestamp = dayjs().unix();
  const currentPhase = phase2EndTimestamp < timestamp ? 3 : 2;

  return (
    <Container>
      <Stack direction="column" spacing={8} mt={8}>
        <LockdropPageHeader />
        <LockdropOverview />
        <MyxAstroTable />
        <MyLockdropDeposits />
      </Stack>
    </Container>
  );
};

export default Phase2;
