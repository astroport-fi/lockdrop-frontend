import React, { FC, ReactNode } from "react";
import { Box, Text, Tooltip } from "@chakra-ui/react";

type Props = {
  label: string;
  value: string;
  maxWidth?: any;
  titleColor?: string;
  asset?: string;
  tooltip?: ReactNode;
};

const Phase1Lockdrop: FC<Props> = ({
  label,
  value,
  asset,
  tooltip,
  maxWidth = [null, null, null, "240px"],
  titleColor = "inherit",
}) => {
  const KPITitle = () => {
    if (tooltip != null) {
      return (
        <Tooltip offset={[10, 0]} label={tooltip} aria-label="A tooltip">
          <Text
            fontSize="20px"
            whiteSpace="nowrap"
            fontWeight="500"
            color={titleColor}
          >
            {value} {asset}
          </Text>
        </Tooltip>
      );
    } else {
      return (
        <Text
          fontSize="20px"
          whiteSpace="nowrap"
          fontWeight="500"
          color={titleColor}
        >
          {value}
        </Text>
      );
    }
  };

  return (
    <Box>
      {KPITitle()}
      <Text fontSize="12px" opacity="0.4" maxW={maxWidth}>
        {label}
      </Text>
    </Box>
  );
};

export default Phase1Lockdrop;
