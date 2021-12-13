import { useMemo } from "react";
import { useWallet } from "@terra-money/wallet-provider";

type Pair = {
  lp: string;
  contract: string;
};

type Contracts = {
  astroToken: string;
  generator: string;
  airdrop: string;
  lockdrop: string;
  auction: string;
  pairs: Pair[];
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
    pairs: [],
  },
  testnet: {
    astroToken: "terra1cc2up8erdqn2l7nz37qjgvnqy56sr38aj9vqry",
    generator: "terra1xsxsys9rew3ypmqaazvuxf9dm0f70qh920aq43",
    lockdrop: "terra1gpcrjee2jvexnev662586kruc4ju3st9ukwgk9",
    airdrop: "terra1rmskcsc338tw4s6ddqm4gvj8uap59hdwm6kxkm",
    auction: "terra1mqf88a02ukxf5ctx568hrusumcf792h7fdhtlw",
    pairs: [
      {
        lp: "terra12xqxr9j9hawuch7vv6y0gz8l0wetjtvu7xqvh9",
        contract: "terra18ctgudzsvt69hv8yscm9cz8t0t6v0u3s09l2kd",
      },
      {
        lp: "terra1ynr4h9qzsn8ju4rrat6zaek6j6hkywduz44jha",
        contract: "terra13ddrtskjet4jlydhkvt2wuk8ykfk2uve5jt5jn",
      },
      {
        lp: "terra1tkznhysk37rw64nc8p6xkt5tfp2058905avweg",
        contract: "terra1360rky0fjv22vaaxua7cfwfxsytczr6pa6ax56",
      },
      {
        lp: "terra18c9c020k09udyepwp9k6mlaha82nwnz8gfnpzd",
        contract: "terra1000dvulnpd68xeye6r726ehlwpa68ec3hcxv9s",
      },
      {
        lp: "terra1gn7jxqutclyld8q343jaq5rwcy0m3t9jl2xhgd",
        contract: "terra1qjvy2an2mfsjqx6jud5jfjxe8mfgwxuvvyy0jv",
      },
      {
        lp: "terra1qlkq2a6dhe8t00xcmsa6mc6nmhxe9z7y6hx9t6",
        contract: "terra12xaun56xx5u8q7pvfhah0yp2zdew7paprmee5t",
      },
      {
        lp: "terra16muqeueyvyh4g30gpc0yenmykas7wahk0jfkpv",
        contract: "terra1xkcxfy6tmkmcw4yc7efmj6ta4yvuhlhkmpjq8x",
      },
      {
        lp: "terra1k3pcz9pf7utppte4m7t8th2juqxmm9spa9wg9w",
        contract: "terra178q2xeuhkkhs8kaznwuuzgh6kp9g0gylpqtxng",
      },
      {
        lp: "terra1tjesn440ggyapecjn8x52g0g3dxz4hguqldlc0",
        contract: "terra1nm5tqjzkxx4x0ykxu95dy92xs8v588et5356wr",
      },
      {
        lp: "terra1s8rcl6mtacj3t68x024298y6mdqkes3e96vlne",
        contract: "terra1rk9cyas8nufcpaw4jg90f543lrk44rtqe8uvz8",
      },
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
