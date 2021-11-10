import React, { FC } from "react";
import { Box, Flex, Text, HStack, Image } from "@chakra-ui/react";
import { fromTerraAmount } from "@arthuryeti/terra";

import { useTokenInfo } from "modules/common";

type Props = {
  token: any;
};

const TokenCard: FC<Props> = ({ token }) => {
  const { getIcon, getSymbol } = useTokenInfo();

  return (
    <Box
      borderWidth="1px"
      borderRadius="xl"
      borderColor="white.200"
      bg="white.100"
      px="4"
      py="3"
      lineHeight="1.3"
    >
      <Flex justify="space-between">
        <Box>
          <HStack spacing="4">
            <Box>
              <Image
                src={getIcon(token.asset)}
                width="2.5rem"
                height="2.5rem"
                alt="Logo"
              />
            </Box>
            <Box>
              <Text fontSize="2xl" color="white">
                {getSymbol(token.asset)}
              </Text>
            </Box>
          </HStack>
        </Box>
        <Box fontWeight="500" textAlign="right">
          <Text fontSize="2xl" color="white">
            {token.amount}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default TokenCard;
