import React, { FC } from "react";
import { Box, Flex } from "@chakra-ui/react";

import WithdrawForm from "components/pool/withdraw/WithdrawForm";
import { usePool } from "modules/pool";

const Withdraw: FC = () => {
  const pool = usePool({
    pairContract: "terra1n6ppcp9ehr3jsyeynpey3mq9dqsq49lf8uxgg5",
    lpTokenContract: "terra1phlrl6anpvmy98ukrnhrcexgnhj2kpfe6lxete",
  });

  if (pool == null) {
    return null;
  }

  return (
    <Box m="0 auto" pt="12">
      <Flex gridGap="8">
        <Box w="container.sm">
          <WithdrawForm
            pool={pool}
            pair={{
              contract: "terra1n6ppcp9ehr3jsyeynpey3mq9dqsq49lf8uxgg5",
              lpToken: "terra1phlrl6anpvmy98ukrnhrcexgnhj2kpfe6lxete",
            }}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default Withdraw;
