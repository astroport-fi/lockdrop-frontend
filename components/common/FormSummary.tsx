import React, { FC } from "react";
import { Box, Text } from "@chakra-ui/react";

import TokenCard from "components/common/TokenCard";

type Props = {
  label: string;
  tokens: {
    asset: string;
    amount: string | number;
    isLp?: boolean;
  }[];
};

const FormSummary: FC<Props> = ({ label, tokens }) => {
  return (
    <Box>
      <Text mb="1" px="2" variant="light">
        {label}
      </Text>
      {tokens.map((token) => {
        return (
          <Box key={token.asset} mb="3" _last={{ mb: "0" }}>
            <TokenCard token={token} />
          </Box>
        );
      })}
    </Box>
  );
};

export default FormSummary;
