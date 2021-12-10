import React, { FC } from "react";
import {
  Box,
  Slider as ChakraSlider,
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
  minLabel?: string;
  maxLabel?: string;
  onChange?: (value: number) => void;
  onClick?: (value: number) => void;
} & SliderProps;

const Slider: FC<Props> = ({
  showGrad = true,
  minLabel = "",
  maxLabel = "",
  onChange,
  onClick,
  ...props
}) => {
  const displayGrad = showGrad ? "block" : "none";

  const labels = [minLabel, "", "", "", maxLabel];

  return (
    <Box>
      <ChakraSlider
        variant="brand"
        size="lg"
        focusThumbOnChange={false}
        onChange={onChange}
        {...props}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb w="6" h="6">
          <SliderHandleIcon color="#000D37" w="6px" h="12px" opacity="0.3" />
        </SliderThumb>
      </ChakraSlider>
      <Flex
        justify="space-between"
        position="relative"
        mt="2"
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

          const target = Math.round(index * (1 / (labels.length - 1)) * 52);

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
              Math.round(((52 * index * ratioFixed - 2) * 100) / (52 - 2)) +
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
  );
};

export default Slider;
