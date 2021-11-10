import { useMemo } from "react";
import { useWallet } from "@terra-money/wallet-provider";

type Contracts = {
  astroToken: string;
  generator: string;
  airdrop: string;
  lockdrop: string;
  auction: string;
};

type Networks = {
  mainnet: Contracts;
  testnet: Contracts;
};

const defaultContracts: { [key: string]: any } = {
  mainnet: {
    astroToken: "terra1ntwxrg374cazaquyrz9jnscq02yl8evsj0jx8e",
    generator: "terra1ymekq0sglcvlnp0u5fvrtugqd04qru33vpd50d",
    airdrop: "terra1pu3ajuesdwwxsh2k20mk3ujhdqfpfy0ps59n5u",
    lockdrop: "terra1wdn2l6f9wyw0lux64sa2k94qw0ldxclc4err9d",
    auction: "terra19z8az0uwlems4k6de04uc8wx8cze0mwsn5pgj9",
  },
  testnet: {
    astroToken: "terra1ntwxrg374cazaquyrz9jnscq02yl8evsj0jx8e",
    generator: "terra1ymekq0sglcvlnp0u5fvrtugqd04qru33vpd50d",
    airdrop: "terra1pu3ajuesdwwxsh2k20mk3ujhdqfpfy0ps59n5u",
    lockdrop: "terra1wdn2l6f9wyw0lux64sa2k94qw0ldxclc4err9d",
    auction: "terra19z8az0uwlems4k6de04uc8wx8cze0mwsn5pgj9",
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
