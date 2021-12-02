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
    astroToken: "terra1fedtv6nwy9ttn522rh3njmpkxs4ftvezfsyg4g",
    generator: "terra1rr5gyh0afr86366j2rflqsnss60sym2223zr6e",
    airdrop: "terra1fjenf9jkxaw2jn8hl0wl5t9uvuepx63mf5a4mj",
    lockdrop: "terra1vfzd5s4jw3q3jten4yhfntm48vl4sr8ev6ss0m",
    auction: "terra1rzzkyaj6ufk7kuzqf7kfqeta88xgklp9edm8aw",
    terraswapLps: [],
  },
  testnet: {
    astroToken: "terra1fedtv6nwy9ttn522rh3njmpkxs4ftvezfsyg4g",
    generator: "terra1rr5gyh0afr86366j2rflqsnss60sym2223zr6e",
    airdrop: "terra1fjenf9jkxaw2jn8hl0wl5t9uvuepx63mf5a4mj",
    lockdrop: "terra1n5t2gd2xfdkgsy9e57y8fv2n9xtukfuqk5wvmn",
    auction: "terra1rzzkyaj6ufk7kuzqf7kfqeta88xgklp9edm8aw",
    terraswapLps: [
      "terra1tj4pavqjqjfm0wh73sh7yy9m4uq3m2cpmgva6n",
      "terra1vg0qyq92ky9z9dp0j9fv5rmr2s80sg605dah6f",
      "terra1zrryfhlrpg49quz37u90ck6f396l4xdjs5s08j",
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
