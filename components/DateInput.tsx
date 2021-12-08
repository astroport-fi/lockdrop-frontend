import React, { FC } from "react";
import { Box, Text, Input } from "@chakra-ui/react";
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
  max,
  inputPaddingRight = 0,
}) => {
  const date = dayjs()
    .add(+value, "w")
    .format("LL");

  return (
    <Box position="relative" height="16">
      <Input
        variant="brand"
        size="lg"
        placeholder="0"
        value={value}
        max={max}
        onChange={onChange}
        onBlur={onBlur}
        pr={inputPaddingRight}
      />
      <Box position="absolute" bottom="2" right="4">
        <Text fontSize="xs" color="white.400">
          {date}
        </Text>
      </Box>
    </Box>
  );
};

export default DateInput;
