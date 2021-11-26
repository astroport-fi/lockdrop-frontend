import React, { FC } from "react";
import { Box, Flex } from "@chakra-ui/react";

import ProvideForm from "components/auction/provide/ProvideForm";

const Provide: FC = () => {
  return (
    <Box m="0 auto" pt="12">
      <Flex gridGap="8">
        <Box w="container.sm">
          <ProvideForm />
        </Box>
      </Flex>
    </Box>
  );
};

export default Provide;
