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
    lockdrop: "terra1gt0cxpel896kr08sjqwfchpz2tlcaem2n35mx0",
    auction: "terra1rzzkyaj6ufk7kuzqf7kfqeta88xgklp9edm8aw",
    terraswapLps: ["terra169fyg8l7lz0r5rpue0zqze6ql3w7jt4w6na5av"],
  },
  testnet: {
    astroToken: "terra169fyg8l7lz0r5rpue0zqze6ql3w7jt4w6na5av",
    generator: "terra1rr5gyh0afr86366j2rflqsnss60sym2223zr6e",
    airdrop: "terra123f7ngp834uev5zp59svmxtnfv35scnawa5j5u",
    lockdrop: "terra18hyerg8qmr2dnl4zjr8pnsh4aj48j06cep4afl",
    auction: "terra1vjk8purguzs4tczsf7g9rd020lcky876egp5qf",
    terraswapLps: [
      "terra1srf30cs8ax73y59gm64lkztnx0zexl8fpv3kx2",
      "terra1ckf4d55u37hs72fm70qmawnyeq5ufmzft2pgwg",
      "terra1xfkaalmgxl7agkwvpff2l8hjh8skwvskdwcgh3",
      "terra1858qwykvxpyv4jgrjpwum50vmf7tue82k9tcy6",
      "terra1vvpmrrf6ze2hd4sq0ylt2f8n38hqf5nnf03ud2",
      "terra1rt92s62xvtg0kmwnts6hx2x5c4xehwtfv55wmu",
      "terra1gwk59eu6d5v9laa24upp2v0t8vvy2w47a6f5n8",
      "terra1388xgk9n0ntajlcfl539rj7g3u3ydkpq5j3wu4",
      "terra1ywmeadt0qeeazzl6ujud2w4lrw6leluc7cx3l4",
      "terra1aukxd67y8ycgzx27zmmwuj0tdwtlxjcw4v39fk",
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
