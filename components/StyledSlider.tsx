import React from 'react';
import { Box, Slider, SliderThumb } from '@mui/material';

interface StyledSliderProps {
  value: number;
  setValue: (val: number) => void;
  minValue?: number;
  maxValue?: number;
  symbol?: string;
  markCount?: number;
  color?: string;
  maxString?: string;
  pointValues?: string[];
}

const StyledSlider: React.FC<StyledSliderProps> = ({
  value,
  setValue,
  minValue = 0,
  maxValue = 100,
  symbol,
  markCount = 5,
  color = '#FED200',
  maxString,
  pointValues
}) => {
  const pointVals = pointValues ?? [
    minValue.toString(),
    maxString ?? `${maxValue} ${symbol ?? ''}`
  ];
  const CustomSliderThumb = (props: any) => {
    const { children, ...other } = props;
    return (
      <SliderThumb {...other}>
        {children}
        <Box className="sliderThumb">
          <Box className="sliderThumbline" mr={0.375} />
          <Box className="sliderThumbline" />
        </Box>
      </SliderThumb>
    );
  };
  return (
    <Box className="styledSlider">
      <Slider
        sx={{ color }}
        components={{ Thumb: CustomSliderThumb }}
        min={minValue}
        max={maxValue}
        value={value}
        onChange={(evt, newValue) => setValue(newValue as number)}
        valueLabelDisplay="auto"
      />
      <Box display="flex" justifyContent="space-between">
        {Array.from({ length: markCount }).map((_, ind) => (
          <Box className="sliderMark" key={ind} />
        ))}
      </Box>
      <Box mt={1} display="flex" justifyContent="space-between">
        {pointVals.map((val, ind) => (
          <small key={ind} className="color-secondary">
            {val}
          </small>
        ))}
      </Box>
    </Box>
  );
};

export default StyledSlider;
