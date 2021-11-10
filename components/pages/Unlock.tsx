import React, { FC } from "react";
import { Box, Flex } from "@chakra-ui/react";

import { PairResponse } from "modules/common";

import UnlockForm from "components/lp/unlock/UnlockForm";

type Props = {
  pair: PairResponse;
};

const Unlock: FC<Props> = ({ pair }) => {
  return (
    <Box m="0 auto" pt="12">
      <Flex gridGap="8">
        <Box w="container.sm">
          <UnlockForm pair={pair} />
        </Box>
      </Flex>
    </Box>
  );
};

export default Unlock;
