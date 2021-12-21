import { useMemo } from "react";
import { num, useAddress, useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";

import { useContracts } from "modules/common";
import { useAuctionState } from "modules/auction";
import { ONE_TOKEN } from "constants/constants";

type Response = {
  total_astro_delegated: string;
  total_ust_delegated: string;
  is_lp_staked: boolean;
  lp_shares_minted: string;
  pool_init_timestamp: number;
  generator_astro_per_share: number;
};

export const useAuctionMetrics = () => {
  const state = useAuctionState();

  return useMemo(() => {
    if (state == null) {
      return null;
    }

    const bonus = 10000000 / 2;
    const ustDelegated = num(state.total_ust_delegated)
      .div(ONE_TOKEN)
      .dp(6)
      .toNumber();
    const astroDelegated = num(state.total_astro_delegated)
      .div(ONE_TOKEN)
      .dp(6)
      .toNumber();

    return {
      bonusPerUst: (bonus / ustDelegated) * 1000,
      bonusPerAstro: (bonus / astroDelegated) * 1000,
      bonusMultiplier: (bonus / astroDelegated) * 100,
    };
  }, [state]);
};

export default useAuctionMetrics;
