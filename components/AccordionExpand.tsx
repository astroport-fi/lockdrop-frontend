import React, { FC } from "react";
import {
  Flex,
  Button,
  VStack,
  AccordionButton,
  AccordionIcon,
} from "@chakra-ui/react";

type Props = {
  isExpanded?: boolean;
};

const AccordionExpand: FC<Props> = ({ isExpanded = false }) => {
  return (
    <AccordionButton
      display="block"
      _hover={{
        background: "transparent",
      }}
      _focus={{
        boxShadow: "none",
      }}
      mt="4"
      p="0"
    >
      <Flex mx="-5" justify="center" flexWrap="wrap" align="center">
        <VStack spacing="10" px="5" justify="flex-start" align="stretch">
          <VStack>
            <Button variant="primary" minWidth="211px" mb="4">
              {isExpanded ? "Minimize" : "Learn more"}
            </Button>
          </VStack>
        </VStack>
      </Flex>
      <AccordionIcon />
    </AccordionButton>
  );
};

export default AccordionExpand;
