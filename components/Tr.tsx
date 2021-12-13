import React, { FC, ReactNode } from "react";
import { Flex, BoxProps } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
  isHead?: boolean;
} & BoxProps;

const Tr: FC<Props> = ({ children, isHead = false, ...rest }) => {
  let extraProps: any = {};

  if (isHead) {
    extraProps = {
      fontSize: "sm",
      py: "8",
      _notLast: {
        borderBottomWidth: "1px",
        borderBottomColor: "white.200",
      },
    };
  }

  return (
    <Flex
      wrap="nowrap"
      direction={{ base: "column", md: "row" }}
      align={{ base: "normal", md: "center" }}
      fontWeight="500"
      borderBottomWidth="1px"
      borderBottomColor="white.200"
      py="3"
      px="8"
      _last={{
        mb: 0,
        borderBottomWidth: "0",
      }}
      {...extraProps}
      {...rest}
    >
      {children}
    </Flex>
  );
};

export default Tr;
