import React, { FC } from "react";
import {
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Flex,
  Button,
  VStack,
  Text,
  SliderProps,
} from "@chakra-ui/react";

import SliderHandleIcon from "components/icons/SliderHandleIcon";

type Props = {
  showGrad?: boolean;
  min?: number;
  max?: number;
  value?: number;
  minLabel?: string;
  maxLabel?: string;
  maxAllowed?: number;
  onChange?: (value: number) => void;
  onClick?: (value: number) => void;
} & SliderProps;

const AstroSlider: FC<Props> = ({
  showGrad = true,
  min = 0,
  max = 0,
  minLabel = "",
  maxLabel = "",
  value,
  maxAllowed,
  onChange,
  onClick,
  ...props
}) => {
  const ratio = maxAllowed / max;
  const displayGrad = showGrad ? "block" : "none";
  const labels = [minLabel, "", "", "", maxLabel];

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
            min={min}
            max={max}
            value={value}
            focusThumbOnChange={false}
            onChange={onChange}
            {...props}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb w="6" h="6">
              <SliderHandleIcon
                color="#000D37"
                w="6px"
                h="12px"
                opacity="0.3"
              />
            </SliderThumb>
          </Slider>
          <Flex
            justify="space-between"
            position="relative"
            h="10"
            display={displayGrad}
          >
            {labels.map((label, index) => {
              const ratio = 1 / (labels.length - 1);
              const ratioFixed = parseFloat(ratio.toFixed(2));

              const alignment =
                {
                  0: "start",
                  [labels.length - 1]: "end",
                }[index] || "center";

              const target = Math.round(
                index * (1 / (labels.length - 1)) * max
              );

              const translate =
                {
                  0: "translateX(0)",
                  [labels.length - 1]: "translateX(-100%)",
                }[index] || "translateX(-50%)";

              const position =
                {
                  0: "0",
                  [labels.length - 1]: "100%",
                }[index] ||
                "calc(" +
                  Math.round(
                    ((max * index * ratioFixed - min) * 100) / (max - min)
                  ) +
                  "%)";

              return (
                <Button
                  key={label}
                  variant="sliderPercent"
                  onClick={() => onClick(target)}
                  position="absolute"
                  left={position}
                  transform={translate}
                >
                  <VStack spacing={2} align={alignment}>
                    <Box
                      w="6px"
                      h="6px"
                      bg="white"
                      borderRadius="100%"
                      opacity="0.4"
                    />
                    <Text textStyle="small" color="white">
                      {label}
                    </Text>
                  </VStack>
                </Button>
              );
            })}
          </Flex>
        </Box>
        {renderMaxUnlockableLiquidity()}
      </Flex>
    </Box>
  );
};

export default AstroSlider;
