import React, { FC } from "react";
import { Box, Flex, Text, HStack, Image } from "@chakra-ui/react";
import { fromTerraAmount } from "@arthuryeti/terra";

import { useTokenInfo } from "modules/common";
import numeral from "numeral";

type Props = {
  token: {
    asset: string;
    amount: string | number;
    isLp?: boolean;
  };
  description?: string;
};

const TokenCard: FC<Props> = ({ token, description }) => {
  const { getIcon, getSymbol } = useTokenInfo();
  const amount = token.amount;

  const renderFormattedAmount = () => {
    if (amount > 1000000) {
      return numeral(amount).divide(1000000).format("0,0.00") + "M";
    } else {
      return numeral(amount).format("0,0.00[0000]");
    }
  };

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
      <Flex justify="space-between" align="center">
        <Box>
          <HStack spacing="4">
            <Box>
              <Image
                src={getIcon(token.asset)}
                h={!token.isLp && "10"}
                alt="Logo"
              />
            </Box>
            <Box>
              <Text fontSize="2xl" color="white">
                {getSymbol(token.asset)}
              </Text>
              {description && <Text variant="light">{description}</Text>}
            </Box>
          </HStack>
        </Box>
        <Box fontWeight="500" textAlign="right">
          <Text fontSize="2xl" color="white">
            {renderFormattedAmount()}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default TokenCard;
