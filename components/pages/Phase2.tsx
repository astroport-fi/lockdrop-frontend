import React from "react";
import { VStack } from "@chakra-ui/react";

import Notifications from "components/Notifications";
import LaunchTimeline from "components/LaunchTimeline";
import Phase2Bootstrap from "components/Phase2Bootstrap";
import AddLiquidity from "components/AddLiquidity";
import AstroAirdrop from "components/AstroAirdrop";

const Phase2 = () => {
  return (
    <VStack my="12" spacing="16" align="stretch">
      <Notifications />
      <LaunchTimeline phase={2} />
      <Phase2Bootstrap />
      <AddLiquidity />
      <AstroAirdrop />
    </VStack>
  );
};

export default Phase2;
