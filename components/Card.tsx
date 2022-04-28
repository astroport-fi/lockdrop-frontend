/* eslint-disable no-ternary */
import React, { FC, ReactNode } from "react";
import { Box, BoxProps } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
  noPadding?: boolean;
} & BoxProps;

const Card: FC<Props> = ({ children, noPadding = false, ...props }) => {
  const py = !noPadding ? "6" : "0";
  const px = !noPadding ? "8" : "0";

  return (
    <Box
      bg="white.80"
      py={py}
      px={px}
      borderRadius="15"
      position="relative"
      color="white"
      {...props}
    >
      {children}
    </Box>
  );
};

export default Card;
