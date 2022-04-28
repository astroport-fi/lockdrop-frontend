import React, { FC, ReactNode } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import Typography from '@mui/material/Typography';
import Countdown from 'react-countdown';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import {
  almostBlack,
  almostWhite,
  gold50,
  orangeGoldGradientHorz,
  peach,
  peach50,
  yellow
} from '../theme/mui-theme';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import TableContainer from '@mui/material/TableContainer';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';

type Props = {
  children?: ReactNode;
  isRight?: boolean;
} & BoxProps;

const COUNTDOWN_DATE = new Date('2022-05-02T00:00:00.000Z');
const END_DATE = new Date(
  COUNTDOWN_DATE.getTime() + 1000 * 60 * 60 * 24 * 7 - 1000
); // 11:59:59

const useStyles: any = makeStyles((theme: Theme) => ({
  countdownText: {}
}));

const ApolloStageIndicator: FC<Props> = ({}) => {
  const classes = useStyles();
  return (
    <Grid container direction="column">
      <Grid
        item
        container
        direction="row"
        columns={7}
        sx={{ padding: '3px 2px' }}
        textAlign="center">
        <Grid
          item
          md={5}
          sx={{
            borderBottom: '3px solid',
            borderBottomColor: yellow,
            padding: '4px 0'
          }}>
          <Typography variant="subtitle1" color="textPrimary">
            STAGE 1
          </Typography>
        </Grid>
        <Grid
          item
          md={2}
          sx={{
            // border: '3px solid ' + almostBlack,
            borderBottom: '3px solid',
            borderBottomColor: peach,
            padding: '4px'
          }}>
          <Typography variant="subtitle1" color="textPrimary">
            STAGE 2
          </Typography>
        </Grid>
      </Grid>
      <Grid
        item
        container
        direction="row"
        columns={7}
        sx={{ padding: '0' }}
        spacing={0}>
        {new Array(7).fill(0).map((_, i) => {
          // todo - add dynamic logic
          if (i === 2) {
            return (
              <Grid
                item
                key={'cell-' + i}
                md={1}
                xs={1}
                textAlign={'center'}
                sx={{
                  background: 'white',
                  border: '2px solid',
                  padding: '3px 0',
                  borderColor: almostBlack
                }}>
                <Typography
                  variant="body2"
                  color={almostBlack}
                  sx={{ fontSize: '12px', lineHeight: '16px' }}>
                  TODAY
                </Typography>
              </Grid>
            );
          } else if (i < 5) {
            return (
              <Grid
                item
                key={'cell-' + i}
                md={1}
                xs={1}
                textAlign={'center'}
                sx={{
                  background: gold50,
                  border: '2px solid',
                  padding: '3px 0',
                  borderColor: almostBlack
                }}>
                <Typography
                  variant="body2"
                  color="textPrimary"
                  sx={{ fontSize: '12px', lineHeight: '16px' }}>
                  {i + 1}
                </Typography>
              </Grid>
            );
          } else {
            return (
              <Grid
                item
                key={'cell-' + i}
                md={1}
                xs={1}
                textAlign={'center'}
                sx={{
                  background: peach50,
                  border: '2px solid',
                  padding: '3px 0',
                  borderColor: almostBlack
                }}>
                <Typography
                  variant="body2"
                  color="textPrimary"
                  sx={{ fontSize: '12px', lineHeight: '16px' }}>
                  {i + 1}
                </Typography>
              </Grid>
            );
          }
        })}
      </Grid>
      <Grid
        item
        container
        direction="row"
        sx={{ padding: '4px 2px' }}
        columns={7}>
        <Grid item md={5} xs={5} textAlign="left" sx={{ whiteSpace: 'nowrap' }}>
          <Typography
            variant="body2"
            color={almostWhite}
            sx={{ fontSize: '12px', lineHeight: '16px' }}>
            {new Date(COUNTDOWN_DATE).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              timeZone: 'UTC'
            })}
          </Typography>
        </Grid>
        <Grid
          item
          md={2}
          xs={2}
          textAlign="right"
          sx={{ whiteSpace: 'nowrap' }}>
          <Typography
            variant="body2"
            color={almostWhite}
            sx={{ fontSize: '12px', lineHeight: '16px' }}>
            {new Date(END_DATE).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              timeZone: 'UTC'
            })}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ApolloStageIndicator;
