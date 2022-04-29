type ApolloLocalNetworkConfig = ApExtNetworkConfig & ApLocalNetworkConfig;

interface Network extends NetworkConfig {
  /** Get finder link */
  finder: (address: string, path?: string) => string;
}

interface ApExtNetworkConfig {
  name: string;
  chainID: string;
}

interface ApLocalNetworkConfig {
  /** Apollo Node */
  apolloLcd: string;
  lcd: string;
  /** Graphql server URL */
  mantle: string;
  stats: string;
  /** Contracts */
  shuttle: Record<ShuttleNetwork, string>;
  /** Fixed fee */
  fee: { gasPrice: number; amount: number };
}
