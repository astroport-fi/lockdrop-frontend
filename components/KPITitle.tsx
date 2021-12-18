import React, { FC, ReactNode } from "react";
import { Box, Text, Tooltip } from "@chakra-ui/react";

type Props = {
  label: string;
  value: string;
  asset?: string;
  tooltip?: ReactNode;
};

const Phase1Lockdrop: FC<Props> = ({ label, value, asset, tooltip }) => {
  const KPITitle = () => {
    if (tooltip != null) {
      return (
        <Tooltip offset={[10, 0]} label={tooltip} aria-label="A tooltip">
          <Text fontSize="20px" whiteSpace="nowrap" fontWeight="500">
            {value} {asset}
          </Text>
        </Tooltip>
      );
    } else {
      return (
        <Text fontSize="20px" whiteSpace="nowrap" fontWeight="500">
          {value} {asset}
        </Text>
      );
    }
  };

  return (
    <Box>
      {KPITitle()}
      <Text fontSize="12px" opacity="0.4">
        {label}
      </Text>
    </Box>
  );
};

export default Phase1Lockdrop;
