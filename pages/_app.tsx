import React from "react";
import {
  WalletControllerChainOptions,
  getChainOptions,
  StaticWalletProvider,
  WalletProvider,
} from "@terra-money/wallet-provider";
import App, { AppProps } from "next/app";
import Head from "next/head";
import { QueryClientProvider, QueryClient } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import advancedFormat from "dayjs/plugin/advancedFormat";
import Layout from "components/Layout";
import theme from "../theme";
import "./styles.scss";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.extend(advancedFormat);

const MyApp = ({
  Component,
  pageProps,
  defaultNetwork,
  walletConnectChainIds,
}: AppProps & WalletControllerChainOptions) => {
  const [queryClient] = React.useState(() => new QueryClient());

  const main = (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ChakraProvider theme={theme}>
            <CSSReset />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ChakraProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );

  return process.browser ? (
    <WalletProvider
      defaultNetwork={defaultNetwork}
      walletConnectChainIds={walletConnectChainIds}
    >
      {main}
    </WalletProvider>
  ) : (
    <StaticWalletProvider defaultNetwork={defaultNetwork}>
      {main}
    </StaticWalletProvider>
  );
};

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const chainOptions = await getChainOptions();
  return { ...appProps, ...chainOptions };
};

export default MyApp;
