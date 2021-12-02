import React, { FC } from "react";
import { Box, Text } from "@chakra-ui/react";

type Props = {
  label: string;
  description?: string;
};

const CardHeader: FC<Props> = ({ label, description }) => {
  return (
    <Box p="6">
      <Text variant="cardHeader">{label}</Text>
      <Text variant="cardDescription">{description}</Text>
    </Box>
  );
};

export default CardHeader;
