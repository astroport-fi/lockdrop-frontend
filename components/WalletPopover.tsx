import React, { FC, ReactNode } from "react";
import {
  Popover,
  PopoverContent,
  Flex,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  PopoverTrigger,
  Button,
} from "@chakra-ui/react";

import CloseIcon from "components/icons/CloseIcon";

type Props = {
  title?: string;
  button?: ReactNode;
  children: ReactNode;
};

const WalletPopover: FC<Props> = ({ title, button, children }) => {
  return (
    <Popover>
      <PopoverTrigger>{button}</PopoverTrigger>
      <PopoverContent w="368px">
        <Flex align="center" justify="space-between" pt="6" pr="6">
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
