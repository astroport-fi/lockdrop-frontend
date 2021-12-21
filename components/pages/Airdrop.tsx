import React, { FC } from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Lottie from "react-lottie";

import * as animationData from "libs/animations/loop.json";
import { useAirdrop } from "modules/airdrop";

import AirdropSuccess from "components/AirdropSuccess";
import AirdropFailed from "components/AirdropFailed";
import Card from "components/Card";

const Airdrop: FC = () => {
  const router = useRouter();
  const address = router.query.address as string;
  const { isLoading, data } = useAirdrop(address);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleClose = () => {
    router.push("/active-phase");
  };

  const renderAirdrop = () => {
    if (!isLoading && data == null) {
      return <AirdropFailed onCloseClick={handleClose} />;
    }

    return (
      <AirdropSuccess
        amount={data?.amount}
        address={address}
        onCloseClick={handleClose}
      />
    );
  };

  if (isLoading) {
    return (
      <Box m="0 auto" pt="12">
        <Flex direction="column" gridGap="8" color="white">
          <Lottie
            options={defaultOptions}
            height={400}
            width={400}
            isStopped={false}
            isPaused={false}
          />

          <Card>
            <Heading fontSize="xl" fontWeight="500" textAlign="center">
              Loading...
            </Heading>
          </Card>
        </Flex>
      </Box>
    );
  }

  return (
    <Box m="0 auto" pt="12">
      <Flex gridGap="8">
        <Box w="container.sm">{renderAirdrop()}</Box>
      </Flex>
    </Box>
  );
};

export default Airdrop;
