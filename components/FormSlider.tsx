import React, { FC } from "react";
import {
  Box,
  Flex,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";

type Props = {
  value: number;
  max: number;
  maxAllowed?: number;
  onChange: (value: number) => void;
};

const FormSlider: FC<Props> = ({ value, max, maxAllowed, onChange }) => {
  const ratio = maxAllowed / max;

  const renderMaxUnlockableLiquidity = () => {
    if (ratio < 1) {
      return (
        <Box w={(1 - ratio) * 100 + "%"}>
          <Text color="red.500" mb="2" whiteSpace="nowrap" fontSize="12px">
            Max unlockable liquidity
          </Text>
          <Box position="relative" h="1" mb="3">
            <Box
              position="absolute"
              inset="0"
              w="100%"
              height="100%"
              bg="red.500"
              zIndex={1}
              opacity="0.4"
              borderRadius="lg"
            ></Box>
            <Box
              bg="red.500"
              w="4px"
              h="4px"
              borderRadius="4"
              position="absolute"
              left="0"
              top="0"
              zIndex={2}
              transform="translateX(-50%)"
            />
          </Box>
        </Box>
      );
    }
  };

  return (
    <Box>
      <Flex align="flex-end">
        <Box flex="1" position="relative" zIndex={10}>
          <Slider
            variant="brand"
            size="lg"
            min={0}
            defaultValue={0}
            value={value}
            focusThumbOnChange={false}
            max={max}
            onChange={onChange}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>
        {renderMaxUnlockableLiquidity()}
      </Flex>
    </Box>
  );
};

export default FormSlider;
