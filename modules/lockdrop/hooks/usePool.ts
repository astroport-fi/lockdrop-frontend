import { useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";

import { useContracts } from "modules/common";

type Response = {
  terraswap_pool: string;
  terraswap_amount_in_lockups: string;
  incentives_share: string;
  weighted_amount: string;
  generator_astro_per_share: string;
  is_staked: boolean;
  migration_info: {
    terraswap_migrated_amount: string;
    astroport_lp_token: string;
  };
};

export const usePool = (lpToken: string) => {
  const { client } = useTerraWebapp();
  const { generator } = useContracts();

  const { data, isLoading } = useQuery(["pool", lpToken], () => {
    return client.wasm.contractQuery<Response>(generator, {
      pool: {
        terraswap_lp_token: lpToken,
      },
    });
  });

  if (isLoading || data == null) {
    return null;
  }

  return data;
};

export default usePool;
