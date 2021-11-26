import React, { FC } from "react";
import { Box, Flex } from "@chakra-ui/react";

import WithdrawForm from "components/auction/withdraw/WithdrawForm";

const Withdraw: FC = () => {
  return (
    <Box m="0 auto" pt="12">
      <Flex gridGap="8">
        <Box w="container.sm">
          <WithdrawForm />
        </Box>
      </Flex>
    </Box>
  );
};

export default Withdraw;
