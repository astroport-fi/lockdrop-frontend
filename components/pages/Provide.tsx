import React, { FC } from "react";
import { Box, Flex } from "@chakra-ui/react";

import ProvideForm from "components/pool/provide/ProvideForm";
import { usePool } from "modules/pool";
import { useConfig } from "modules/auction";

const Provide: FC = () => {
  const config = useConfig();
  const pool = usePool({
    pairContract: config?.pool_info.astro_ust_pool_address,
    lpTokenContract: config?.pool_info.astro_ust_lp_token_address,
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
            pair={config?.pool_info.astro_ust_pool_address}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default Provide;
