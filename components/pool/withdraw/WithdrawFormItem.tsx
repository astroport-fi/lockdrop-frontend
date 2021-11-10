import React, { FC } from "react";
import { Box, Flex, BoxProps, Text, HStack } from "@chakra-ui/react";

import { format } from "libs/parse";
import { useTokenInfo } from "modules/common";

type Props = {
  token: string;
  amount: string;
} & BoxProps;

const WithdrawFormItem: FC<Props> = ({ token, amount, ...props }) => {
  const { getSymbol } = useTokenInfo();

  return (
    <Flex
      justify="space-between"
      borderBottomWidth="1px"
      borderBottomColor="white.300"
      pb="4"
      {...props}
    >
      <Box>
        <HStack>
          <Text>{getSymbol(token)}</Text>
        </HStack>
      </Box>
      <Box textAlign="right">
        <Text>{format(amount)}</Text>
      </Box>
    </Flex>
  );
};

export default WithdrawFormItem;
