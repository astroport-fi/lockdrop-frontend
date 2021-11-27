import React, { FC, ReactNode } from "react";
import {
  Popover,
  PopoverContent,
  Flex,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  PopoverTrigger,
  PopoverProps,
} from "@chakra-ui/react";

import CloseIcon from "components/icons/CloseIcon";

type Props = {
  title?: string;
  triggerElement: () => React.ReactElement;
  children: ReactNode;
} & PopoverProps;

const WalletPopover: FC<Props> = ({
  title,
  triggerElement,
  children,
  ...props
}) => {
  return (
    <Popover {...props}>
      <PopoverTrigger>{triggerElement()}</PopoverTrigger>
      <PopoverContent w="96">
        <Flex align="center" justify="space-between" mb="4">
          <PopoverHeader>{title}</PopoverHeader>
          <PopoverCloseButton position="static">
            <CloseIcon w="6" h="6" color="#000D37" BackgroundOpacity="0" />
          </PopoverCloseButton>
        </Flex>
        <PopoverBody>{children}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default WalletPopover;
