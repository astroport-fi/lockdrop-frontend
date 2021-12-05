import React, { FC } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { useAirdrop } from "modules/airdrop";
import AirdropSuccess from "components/AirdropSuccess";
import AirdropFailed from "components/AirdropFailed";

const Airdrop: FC = () => {
  const { query } = useRouter();
  const address = query.address as string;
  // const { data, isLoading } = useAirdrop(address);
  const airdrop = useAirdrop(address);

  const renderAirdrop = () => {
    if (airdrop == null) {
      return <AirdropFailed onCloseClick={() => {}} />;
    }

    return (
      <AirdropSuccess
        amount={airdrop?.amount}
        address={address}
        onCloseClick={() => {}}
      />
    );
  };

  // if (isLoading) {
  //   return null;
  // }

  return (
    <Box m="0 auto" pt="12">
      <Flex gridGap="8">
        <Box w="container.sm">{renderAirdrop()}</Box>
      </Flex>
    </Box>
  );
};

export default Airdrop;
