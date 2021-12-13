import React, { FC } from "react";
import { Flex, Text, FlexProps } from "@chakra-ui/react";

type Props = {
  day: number;
  isToday?: boolean;
  isPurple?: boolean;
} & FlexProps;

const DateNumber: FC<Props> = ({ day, isToday = false, ...props }) => {
  if (isToday) {
    return (
      <Flex
        align="center"
        justify="center"
        fontWeight="700"
        flex="1"
        position="relative"
        {...props}
      >
        <Flex
          w="105%"
          h="150%"
          position="absolute"
          top="50%"
          left="-1px"
          bg="#EF5177"
          align="center"
          justify="center"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          transform="translateY(-50%)"
        >
          <Text color="white" fontSize="12px" lineHeight="1">
            Today
          </Text>
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex
      align="center"
      justify="center"
      flex="1"
      color="#999"
      bg="white"
      {...props}
    >
      <Text fontSize="11px" lineHeight="1" whiteSpace="nowrap">
        {day}
      </Text>
    </Flex>
  );
};

export default DateNumber;
