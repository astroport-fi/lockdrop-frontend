import React from "react";
import { VStack, Text } from "@chakra-ui/react";

import LockdropIntroduction from "components/LockdropIntroduction";

const LaunchPlan = () => {
  return (
    <VStack my="12" spacing="16" align="stretch">
      <LockdropIntroduction />
    </VStack>
  );
};

export default LaunchPlan;
