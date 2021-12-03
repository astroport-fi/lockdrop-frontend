import React, { FC } from "react";
import { Box, Flex, Button, Text } from "@chakra-ui/react";
import { Fee } from "@terra-money/terra.js";

import FormFee from "components/common/FormFee";

export interface Cell {
  title: string;
  value: string;
}

export interface ConfirmButton {
  title: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

interface Props {
  cells: Cell[];
  fee: Fee;
  confirmButton: ConfirmButton;
}

const CommonFooter: FC<Props> = ({ cells, fee, confirmButton }) => {
  return (
    <Box>
      {cells.length > 0 && (
        <Flex justify="space-between" mt="8">
          {cells.map((cell) => (
            <Box
              key={cell.title}
              flex="1"
              borderRightColor="whiteAlpha.600"
              borderRightWidth="1px"
              _first={{
                borderLeftColor: "whiteAlpha.600",
                borderLeftWidth: "1px",
              }}
              textAlign="center"
            >
              <Text color="white" fontSize="sm">
                {cell.value}
              </Text>
              <Text variant="light" color="white.400" fontSize="xs">
                {cell.title}
              </Text>
            </Box>
          ))}
        </Flex>
      )}
      <Flex flex="1" align="center" flexDirection="column" mt="8">
        <Button
          variant="primary"
          type={confirmButton.type || "button"}
          isDisabled={confirmButton.isDisabled}
          isLoading={confirmButton.isLoading}
          onClick={confirmButton.onClick}
          minW="64"
        >
          {confirmButton.title}
        </Button>
      </Flex>
      <FormFee fee={fee} />
    </Box>
  );
};

export default CommonFooter;
