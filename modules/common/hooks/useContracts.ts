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
    lockdrop: "terra1gt0cxpel896kr08sjqwfchpz2tlcaem2n35mx0",
    airdrop: "terra1fjenf9jkxaw2jn8hl0wl5t9uvuepx63mf5a4mj",
    auction: "terra1rzzkyaj6ufk7kuzqf7kfqeta88xgklp9edm8aw",
    terraswapLps: ["terra169fyg8l7lz0r5rpue0zqze6ql3w7jt4w6na5av"],
  },
  testnet: {
    astroToken: "terra1cc2up8erdqn2l7nz37qjgvnqy56sr38aj9vqry",
    generator: "terra1xsxsys9rew3ypmqaazvuxf9dm0f70qh920aq43",
    lockdrop: "terra1dlcu7repc4pdaa2crqacyhwkrndhpre5vnqx49",
    airdrop: "terra1mn7ykwthhgnufgjs6wfd7s7c20567l7kxwwseu",
    auction: "terra1tumsm69z99av7xlh7yevvqv6l5y9kqn0xtmlr3",
    terraswapLps: [
      "terra12xqxr9j9hawuch7vv6y0gz8l0wetjtvu7xqvh9",
      "terra1ynr4h9qzsn8ju4rrat6zaek6j6hkywduz44jha",
      "terra1tkznhysk37rw64nc8p6xkt5tfp2058905avweg",
      "terra18c9c020k09udyepwp9k6mlaha82nwnz8gfnpzd",
      "terra1gn7jxqutclyld8q343jaq5rwcy0m3t9jl2xhgd",
      "terra1qlkq2a6dhe8t00xcmsa6mc6nmhxe9z7y6hx9t6",
      "terra16muqeueyvyh4g30gpc0yenmykas7wahk0jfkpv",
      "terra1k3pcz9pf7utppte4m7t8th2juqxmm9spa9wg9w",
      "terra1tjesn440ggyapecjn8x52g0g3dxz4hguqldlc0",
      "terra1s8rcl6mtacj3t68x024298y6mdqkes3e96vlne",
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
