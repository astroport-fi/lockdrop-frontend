import { useAddress, useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";

import { useContracts } from "modules/common";

type Response = {
  auction_contract_address: string;
  generator_address: string;
  astro_token_address: string;
  init_timestamp: string;
  deposit_window: string;
  withdrawal_window: string;
  min_lock_duration: string;
  max_lock_duration: string;
  lockdrop_incentives: string;
};

export const useConfig = () => {
  const { client } = useTerraWebapp();
  const address = useAddress();
  const { generator } = useContracts();

  const { data, isLoading } = useQuery("config", () => {
    return client.wasm.contractQuery<Response>(generator, {
      config: {},
    });
  });

  if (isLoading || data == null) {
    return null;
  }

  return data;
};

export default useConfig;
