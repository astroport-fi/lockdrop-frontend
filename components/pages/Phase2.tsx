import React from "react";
import { VStack, Link } from "@chakra-ui/react";

import Notification from "components/Notification";
import LaunchTimeline from "components/LaunchTimeline";
import Phase2Bootstrap from "components/Phase2Bootstrap";
import AddLiquidity from "components/AddLiquidity";
import AstroAirdrop from "components/AstroAirdrop";

const Phase2 = () => {
  return (
    <VStack my="12" spacing="16" align="stretch">
      {/* <Notification variant="info">
        Thank you for participating in phase 1, 3,000 ASTRO were added to your
        ASTRO Balance. <Link>Learn More</Link>
      </Notification>
      <Notification variant="error">
        Thank you for participating in phase 1, 3,000 ASTRO were added to your
        ASTRO Balance. <Link>Learn More</Link>
      </Notification>
      <Notification variant="success">
        Thank you for participating in phase 1, 3,000 ASTRO were added to your
        ASTRO Balance. <Link>Learn More</Link>
      </Notification> */}
      <LaunchTimeline phase={2} />
      <Phase2Bootstrap />
      <AddLiquidity />
      <AstroAirdrop />
    </VStack>
  );
};

export default Phase2;
