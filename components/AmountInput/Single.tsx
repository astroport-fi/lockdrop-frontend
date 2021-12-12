import React, { FC } from "react";
import { Box, Text, Flex, Image } from "@chakra-ui/react";
import { fromTerraAmount } from "@arthuryeti/terra";

import { useTokenInfo } from "modules/common";

type Props = {
  asset: string;
};

const Single: FC<Props> = ({ asset }) => {
  const { getIcon, getSymbol } = useTokenInfo();
  const icon = getIcon(asset);

  return (
    <Box
      bg="white.100"
      color="white"
      display="flex"
      justify="center"
      align="center"
      borderRadius="full"
      borderWidth="1px"
      borderColor="white.200"
      textAlign="left"
      px="2"
      h="16"
      lineHeight="1.2"
      isFullWidth
    >
      <Flex align="center">
        <Box>
          <Image src={icon} width="2rem" height="2rem" alt="Logo" />
        </Box>

        <Box ml="3" fontWeight="500" flex="1">
          <Text fontSize="2xl" color="white">
            {getSymbol(asset)}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Single;
