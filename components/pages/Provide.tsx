import React, { FC } from "react";
import { Box, Flex } from "@chakra-ui/react";

import ProvideForm from "components/pool/provide/ProvideForm";
import { usePool } from "modules/pool";

const Provide: FC = () => {
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
          <ProvideForm
            pool={pool}
            pair="terra1n6ppcp9ehr3jsyeynpey3mq9dqsq49lf8uxgg5"
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default Provide;
