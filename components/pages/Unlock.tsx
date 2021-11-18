import React, { FC } from "react";
import { Box, Flex } from "@chakra-ui/react";

import UnlockForm from "components/lp/unlock/UnlockForm";

type Props = {
  lpToken: string;
};

const Unlock: FC<Props> = ({ lpToken }) => {
  return (
    <Box m="0 auto" pt="12">
      <Flex gridGap="8">
        <Box w="container.sm">
          <UnlockForm lpToken={lpToken} />
        </Box>
      </Flex>
    </Box>
  );
};

export default Unlock;
