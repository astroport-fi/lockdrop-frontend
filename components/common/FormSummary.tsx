import React, { FC } from "react";
import { Box, Text } from "@chakra-ui/react";

import TokenCard from "components/common/TokenCard";
import { num } from "@arthuryeti/terra";

type Props = {
  label: string;
  tokens: {
    asset: string;
    amount: string | number;
  }[];
};

const FormSummary: FC<Props> = ({ label, tokens }) => {
  return (
    <Box>
      <Text mb="1" px="2" variant="light">
        {label}
      </Text>
      {tokens.map((token) => {
        return <TokenCard key={token.asset} token={token} />;
      })}
    </Box>
  );
};

export default FormSummary;
