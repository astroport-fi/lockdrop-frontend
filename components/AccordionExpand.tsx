import React, { FC } from "react";
import { Text, VStack, AccordionButton, AccordionIcon } from "@chakra-ui/react";

import ArrowDownIcon from "components/icons/ArrowDownIcon";

type Props = {
  isExpanded?: boolean;
};

const AccordionExpand: FC<Props> = ({ isExpanded = false }) => {
  return (
    <VStack spacing="4">
      <AccordionButton>
        <Text>{isExpanded ? "Minimize" : "Learn more"}</Text>
      </AccordionButton>
      <ArrowDownIcon style={{ transform: isExpanded && "rotate(180deg)" }} />
    </VStack>
  );
};

export default AccordionExpand;
