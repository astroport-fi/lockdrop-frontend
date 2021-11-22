import React from "react";
import { VStack } from "@chakra-ui/react";

import Phase2Bootstrap from "components/Phase2Bootstrap";
import AstroAirdrop2 from "components/AstroAirdrop2";

const Airdrop = () => {
  return (
    <VStack my="12" spacing="16" align="stretch">
      <AstroAirdrop2 />
    </VStack>
  );
};

export default Airdrop;
