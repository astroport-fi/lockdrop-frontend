/* eslint-disable no-ternary */
import React, { FC, ReactNode } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { white60 } from '../theme/mui-theme';

type Props = {
  value: number;
  decimals?: number;
  fontSize?: string;
  postFix?: string;
  percentage?: boolean;
  decimalsInGrey?: boolean;
};

const useStyles: any = makeStyles((theme: Theme) => ({
  lighter: {
    color: white60
  },
  smaller: {
    fontSize: '1.0rem',
    fontWeight: 'normal'
  }
}));

const ApolloFormattedStatistic: FC<Props> = ({
  value = 0,
  decimals = 0,
  fontSize = '1.0rem',
  postFix = '',
  percentage = false,
  decimalsInGrey = false
}) => {
  const classes = useStyles();
  return (
    <div>
      <span style={{ fontSize: fontSize, marginRight: '8px' }}>
        {value.toLocaleString('en-US')}
        {decimals > 0 && (
          <span className={decimalsInGrey && `${classes.lighter} `}>
            {'.' + value.toFixed(decimals).toString().split('.')[1]}
          </span>
        )}
        {percentage && '%'}
      </span>
      <span className={`${classes.lighter} ${classes.smaller}`}>{postFix}</span>
    </div>
  );
};

export default ApolloFormattedStatistic;
