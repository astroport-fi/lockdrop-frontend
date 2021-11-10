import { useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";

import { useContracts } from "modules/common";
import { ONE_TOKEN } from "constants/constants";

type Response = {
  total_incentives_share: string;
  total_astro_delegated: string;
  total_astro_returned_available: string;
  are_claims_allowed: boolean;
};

export const useLockState = () => {
  const { client } = useTerraWebapp();
  const { lockdrop } = useContracts();

  const { data, isLoading } = useQuery("state", () => {
    return client.wasm.contractQuery<Response>(lockdrop, {
      state: {},
    });
  });

  if (isLoading || data == null) {
    return null;
  }

  return {
    astroRewardsAllocated: +data.total_incentives_share / ONE_TOKEN,
  };
};

export default useLockState;
