import React from "react";
import { VStack } from "@chakra-ui/react";

import LaunchTimeline from "components/LaunchTimeline";
import Phase1Lockdrop from "components/Phase1Lockdrop";
import MyLockedAstroLiquidity from "components/MyLockedAstroLiquidity";
import MyTerraswapPools from "components/MyTerraswapPools";

const Phase1 = () => {
  return (
    <VStack my="12" spacing="16" align="stretch">
      <LaunchTimeline phase={1} />
      <Phase1Lockdrop />
      <MyLockedAstroLiquidity />
      <MyTerraswapPools />
    </VStack>
  );
};

export default Phase1;
