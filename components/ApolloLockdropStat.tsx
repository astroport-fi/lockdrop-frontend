import React, { Component } from 'react';
import { Flex, Spinner } from '@chakra-ui/react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { white95, white60 } from '../theme/mui-theme';

type Props = {
  titleContent: Component;
  subtitle: string;
  textAlign?: string;
};

const ApolloLockdropStat = ({ titleContent, subtitle, textAlign }) => {
  return (
    <Grid container direction="column" spacing={1}>
      <Grid item textAlign={textAlign}>
        <Typography
          variant="body2"
          color={white60}
          sx={{
            fontSize: '15px',
            lineHeight: '20px',
            fontWeight: 'normal',
            mb: '8px'
          }}>
          {subtitle}
        </Typography>
      </Grid>
      <Grid item textAlign={textAlign}>
        <Typography variant="h6" sx={{ fontWeight: 'normal' }} color={white95}>
          {titleContent}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ApolloLockdropStat;
