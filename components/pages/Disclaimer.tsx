import React from "react";
import { Box } from "@chakra-ui/react";

import Navbar from "components/Navbar";
import DisclaimerContent from "components/DisclaimerContent";

const Disclaimer = () => {
  return (
    <Box bg="brand.darkBlue">
      <Box position="relative" zIndex="10">
        <DisclaimerContent />
      </Box>
    </Box>
  );
};

export default Disclaimer;
