import React, { FC } from "react";
import { Box, Text, NumberInput, NumberInputField } from "@chakra-ui/react";
import dayjs from "dayjs";

type Props = {
  onChange: any;
  onBlur: any;
  value: string;
  inputPaddingRight?: string;
  max?: number;
};

const DateInput: FC<Props> = ({
  onChange,
  onBlur,
  value,
  isDisabled,
  max,
  inputPaddingRight = 0,
}) => {
  const date = dayjs()
    .add(+value, "w")
    .format("LL");

  return (
    <Box position="relative" height="16">
      <NumberInput
        variant="brand"
        size="lg"
        precision={0}
        value={value}
        max={max}
        onChange={(_, valueNumber) => onChange(valueNumber)}
        isDisabled
        onBlur={onBlur}
      >
        <NumberInputField placeholder="0" pr={inputPaddingRight} />
      </NumberInput>
      <Box position="absolute" bottom="2" right="4">
        <Text fontSize="xs" color="white.400">
          {date}
        </Text>
      </Box>
    </Box>
  );
};

export default DateInput;
