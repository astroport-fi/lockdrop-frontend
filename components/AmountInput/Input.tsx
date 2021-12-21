import React, { FC } from "react";
import { Box, NumberInput, NumberInputField } from "@chakra-ui/react";

import { fromTerraAmount } from "@arthuryeti/terra";

type Props = {
  onChange: any;
  onBlur: any;
  value: {
    amount: string;
    asset: string;
  };
  limit?: number;
  isDisabled?: boolean;
};

const Input: FC<Props> = ({ onChange, onBlur, value, limit, isDisabled }) => {
  return (
    <Box>
      <NumberInput
        variant="brand"
        size="lg"
        precision={3}
        value={value.amount}
        max={limit}
        onChange={onChange}
        onBlur={onBlur}
        isDisabled={isDisabled}
      >
        <NumberInputField placeholder="0.00" />
      </NumberInput>
    </Box>
  );
};

export default Input;
