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
    airdrop: "terra1hq5yf80uk0pe49qe6yl9wjm7rjk6hnx94ugs9u",
    lockdrop: "terra1qxnq5zfjdr2lq6xmg38x22eay4vn633dqtzhke",
    auction: "terra1k44ar02j9uey7egpat8k65v0lmkc6mgs4625s7",
    terraswapLps: [
      "terra1srf30cs8ax73y59gm64lkztnx0zexl8fpv3kx2",
      "terra167cme4ad07fwxap60r73p3m9f9cw45jwkwsf73",
      "terra15twkj647e252k53aqjcyhhmrdv4d8a9lqdeq69",
      "terra10fcqzg24twderq6wqfvvs7j0dnwjae5app85vv",
      "terra18y7dnplnh8kncxmkuhnr3mdjc8wny0zrxreynv",
      "terra1gtt2ev9ekvwc8l3mkktssu6neaxh9c49h22due",
      "terra1vx3x7ngnmk0luxzvfpl04hjl4hc9zq7ckeysza",
      "terra1aes02j6nnakrdpepee4cmcvuca58sxnndnp9uv",
      "terra1f4f8d9nu76hme6cd2u8706w3t6uf2yfztj2mqw",
      "terra15qs9pf656jpza4nju8y4a9kwke03pzkhygv2gp",
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
