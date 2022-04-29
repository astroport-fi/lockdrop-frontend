import React, { FC } from 'react';
import { Flex } from '@chakra-ui/react';
import { Container } from '@mui/material';
import { Global } from '@emotion/react';
import { TerraWebappProvider } from '@arthuryeti/terra';
import { useWallet, WalletStatus } from '@terra-money/wallet-provider';

import { RecoilRoot } from 'recoil';
import { useInitAddress, useInitNetwork } from '../data/init';

import { ThemeProvider } from '@mui/material/styles';
import { almostBlack, theme } from '../theme/mui-theme';

import Header from 'components/Header';
import whitelist from 'constants/whitelist.json';
import { AstroAppProvider } from 'modules/common';

const RecoilInit = () => {
  useInitAddress();
  useInitNetwork();
  return <></>;
};

const Layout: FC = ({ children }) => {
  const wallet = useWallet();
  const isInitializing = wallet.status == WalletStatus.INITIALIZING;

  return (
    <Flex height="100vh" direction="column">
      <Global
        styles={{
          'html,body': {
            // height: "100%",
            width: '100%',
            overflowX: 'hidden',
            position: 'relative'
          },
          body: {
            backgroundColor: almostBlack
          },
          '*::-webkit-scrollbar': {
            width: '6px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#5643F2',
            borderRadius: '6px'
          },
          '#chakra-toast-manager-bottom-right': {
            right: '32px!important',
            bottom: '32px!important'
          },
          '@font-face': {
            fontFamily: 'WhyteInktrap',
            src: "url('/WhyteInktrap-Regular.woff') format('woff')"
          }
        }}
      />
      {!isInitializing && (
        <TerraWebappProvider>
          <AstroAppProvider data={whitelist}>
            <RecoilRoot>
              <RecoilInit />
              <Header />
              <ThemeProvider theme={theme}>
                <Container>{children}</Container>
              </ThemeProvider>
            </RecoilRoot>
          </AstroAppProvider>
        </TerraWebappProvider>
      )}
    </Flex>
  );
};

export default Layout;
