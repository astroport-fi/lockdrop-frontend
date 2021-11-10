import React from "react";
import { VStack, Alert, Link, Box, Button } from "@chakra-ui/react";

import CloseIcon from "components/icons/CloseIcon";

const Notifications = () => {
  return (
    <VStack spacing="6">
      <Alert status="info">
        <Box flex="1">
          Thank you for participating in phase 1, 3,000 ASTRO were added to your
          ASTRO Balance. <Link>[Learn More]</Link>
        </Box>
        <Button variant="icon">
          <CloseIcon color="white" w="6" h="6" />
        </Button>
      </Alert>
      <Alert status="error">
        <Box flex="1">
          Thank you for participating in phase 1, 3,000 ASTRO were added to your
          ASTRO Balance. <Link>[Learn More]</Link>
        </Box>
        <Button variant="icon">
          <CloseIcon color="white" w="6" h="6" />
        </Button>
      </Alert>
      <Alert status="success">
        <Box flex="1">
          Thank you for participating in phase 1, 3,000 ASTRO were added to your
          ASTRO Balance. <Link>[Learn More]</Link>
        </Box>
        <Button variant="icon">
          <CloseIcon color="white" w="6" h="6" />
        </Button>
      </Alert>
    </VStack>
  );
};

export default Notifications;
