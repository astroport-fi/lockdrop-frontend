import React, { FC } from "react";
import { Box, Flex } from "@chakra-ui/react";

import { PairResponse } from "modules/common";

import LockForm from "components/lp/lock/LockForm";

type Props = {
  lpToken: string;
};

const Lock: FC<Props> = ({ lpToken }) => {
  return (
    <Box m="0 auto" pt="12">
      <Flex gridGap="8">
        <Box w="container.sm">
          <LockForm lpToken={lpToken} />
        </Box>
      </Flex>
    </Box>
  );
};

export default Lock;
