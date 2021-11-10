/* eslint-disable no-ternary */
import React, { FC, ReactNode } from "react";
import { Box, BoxProps } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
} & BoxProps;

const Card: FC<Props> = ({ children, ...props }) => {
  return (
    <Box py="8" px="12" border="1px" position="relative" {...props}>
      <Box w="4" h="4" bg="white" position="absolute" left="0" top="0"></Box>
      <Box w="4" h="4" bg="white" position="absolute" right="0" top="0"></Box>
      <Box
        w="4"
        h="4"
        bg="white"
        position="absolute"
        right="0"
        bottom="0"
      ></Box>
      <Box w="4" h="4" bg="white" position="absolute" left="0" bottom="0"></Box>
      {children}
    </Box>
  );
};

export default Card;
