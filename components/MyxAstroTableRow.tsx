import React, { FC, ReactNode } from 'react';
import ApolloCardHeader from './ApolloCardHeader';
import ApolloCardBody from './ApolloCardBody';
import ExternalLinkIcon from './icons/ExternalLinkIcon';
import Grid from '@mui/material/Grid';
import { white95, white60, borderGrey } from '../theme/mui-theme';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Button from './Button';

type Props = {
  icon: any;
  name: any;
  amount: string;
  inWallet: number;
};

const MyxAstroTableRow: FC<Props> = ({
  icon,
  name,
  amount,
  inWallet
}: Props) => {
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      direction="row"
      sx={{
        p: 3,
        color: white95,
        fontSize: '15px',
        lineHeight: '20px',
        borderBottom: '1px solid',
        borderColor: borderGrey,
        '&:last-of-type': {
          borderBottom: 'none'
        }
      }}>
      <Grid item>
        <Grid
          container
          direction="row"
          justifyContent="center"
          spacing={2}
          alignItems="flexEnd">
          <Grid item>
            <Image src={icon} width={20} height={20} alt="Apollo Icon" />
          </Grid>
          <Grid item>
            <Typography
              sx={{ fontSize: '15px', fontWeight: 500 }}
              color={white95}>
              {name}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>{amount}</Grid>
      <Grid item>{inWallet}</Grid>
      <Grid item>
        <Button label="Lock xASTRO" />
      </Grid>
    </Grid>
  );
};

export default MyxAstroTableRow;
