import { useMemo } from "react";
import { num, useAddress, useTerraWebapp } from "@arthuryeti/terra";

import { useAuctionState } from "modules/auction";
import { useContracts } from "modules/common";
import { ONE_TOKEN } from "constants/constants";

export const useProvideFooter = ({ ustAmount, astroAmount }) => {
  const state = useAuctionState();

  return useMemo(() => {
    let shareOfPool = 0;
    if (
      state == null ||
      num(state.total_ust_delegated).eq(0) ||
      num(state.total_astro_delegated).eq(0)
    ) {
      return {
        shareOfPool,
      };
    }

    const totalUstDelegated = num(state.total_ust_delegated)
      .div(ONE_TOKEN)
      .toNumber();
    const totalAstroDelegated = num(state.total_astro_delegated)
      .div(ONE_TOKEN)
      .toNumber();
    const shareOfPoolUst = num(ustAmount).div(totalUstDelegated).toNumber();
    const shareOfPoolAstro = num(astroAmount)
      .div(totalAstroDelegated)
      .toNumber();

    shareOfPool = ((shareOfPoolUst + shareOfPoolAstro) / 2) * 100;

    if (shareOfPool > 100) {
      shareOfPool = 100;
    }

    return {
      shareOfPool: shareOfPool.toFixed(2),
    };
  }, [astroAmount, ustAmount, state]);
};

export default useProvideFooter;
