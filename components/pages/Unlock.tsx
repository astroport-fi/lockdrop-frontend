import React, { FC } from "react";
import { Box, Flex } from "@chakra-ui/react";

import UnlockForm from "components/lp/unlock/UnlockForm";

type Props = {
  lpToken: string;
  duration: string;
};

const Unlock: FC<Props> = ({ lpToken, duration }) => {
  return (
    <Box m="0 auto" pt="12">
      <Flex gridGap="8">
        <Box w="container.sm">
          <UnlockForm lpToken={lpToken} duration={duration} />
        </Box>
      </Flex>
    </Box>
  );
};

export default Unlock;
