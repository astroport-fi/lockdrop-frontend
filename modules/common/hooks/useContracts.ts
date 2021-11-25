import { useMemo } from "react";
import { useWallet } from "@terra-money/wallet-provider";

type Contracts = {
  astroToken: string;
  generator: string;
  airdrop: string;
  lockdrop: string;
  auction: string;
  terraswapLps: string[];
};

type Networks = {
  mainnet: Contracts;
  testnet: Contracts;
};

const defaultContracts: { [key: string]: any } = {
  mainnet: {
    astroToken: "terra1kmgk72wetuz6gxwatks5r6al048tn6rlxy3t68",
    generator: "terra1ymekq0sglcvlnp0u5fvrtugqd04qru33vpd50d",
    airdrop: "terra13p3z5n40kqvj982wj9uueqkruetf6z27uh4h5l",
    lockdrop: "terra1w025z6yxp6p0q0yu0k98nsh6cxdpk25y9xnend",
    auction: "terra1xhrfnxa5kua8z4rt0aahlw6yppu3ay70n3strl",
    terraswapLps: [],
  },
  testnet: {
    astroToken: "terra1kmgk72wetuz6gxwatks5r6al048tn6rlxy3t68",
    generator: "terra1ymekq0sglcvlnp0u5fvrtugqd04qru33vpd50d",
    airdrop: "terra13p3z5n40kqvj982wj9uueqkruetf6z27uh4h5l",
    lockdrop: "terra1w025z6yxp6p0q0yu0k98nsh6cxdpk25y9xnend",
    auction: "terra1xhrfnxa5kua8z4rt0aahlw6yppu3ay70n3strl",
    terraswapLps: [
      "terra1vg0qyq92ky9z9dp0j9fv5rmr2s80sg605dah6f",
      "terra1yp7rl8p2elwem2pxew58fjc29cmwmzfsax94pf",
    ],
  },
};

export const useContracts = (initial?: Networks): Contracts => {
  const {
    network: { name },
  } = useWallet();
  const contracts = initial ?? defaultContracts;

  return useMemo(() => {
    return contracts[name];
  }, [contracts, name]);
};

export default useContracts;
