import React, { FC } from "react";
import { Box, Text } from "@chakra-ui/react";

type Props = {
  label: string;
  value: string;
  asset?: string;
};

const Phase1Lockdrop: FC<Props> = ({ label, value, asset }) => {
  return (
    <Box>
      <Text fontSize="20px" whiteSpace="nowrap" fontWeight="500">
        {value} {asset}
      </Text>
      <Text fontSize="12px" opacity="0.4">
        {label}
      </Text>
    </Box>
  );
};

export default Phase1Lockdrop;
