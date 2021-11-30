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
    astroToken: "terra1y5zwzjppw49e7d0ruj9099vuen8a0jw8vedr9a",
    generator: "terra1ht5htgr5rsp477kere2q4mwuv2w5ae5un0h3x8",
    airdrop: "terra1frw0vlt4sgae86mfqtczgrmf7fdr5698xk4hwt",
    lockdrop: "terra1vfzd5s4jw3q3jten4yhfntm48vl4sr8ev6ss0m",
    auction: "terra1qapvjut23rhrdx7g82j4e036n7rjsdnd7sshcz",
    terraswapLps: [],
  },
  testnet: {
    astroToken: "terra1y5zwzjppw49e7d0ruj9099vuen8a0jw8vedr9a",
    generator: "terra1ht5htgr5rsp477kere2q4mwuv2w5ae5un0h3x8",
    airdrop: "terra1frw0vlt4sgae86mfqtczgrmf7fdr5698xk4hwt",
    lockdrop: "terra1vfzd5s4jw3q3jten4yhfntm48vl4sr8ev6ss0m",
    auction: "terra1qapvjut23rhrdx7g82j4e036n7rjsdnd7sshcz",
    terraswapLps: [
      "terra1rsnp6j656wefqwfnj94z8e3vkm69tq7jzj5jxl",
      "terra1mj9lhunxhzzulsl39cvmjsx0yqrg3xdjfps72w",
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
