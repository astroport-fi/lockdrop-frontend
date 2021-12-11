import { useMemo } from "react";
import { num } from "@arthuryeti/terra";

import { useAuctionState, useConfig } from "modules/auction";
import { ONE_TOKEN } from "constants/constants";
import dayjs from "dayjs";

export const useProvideFooter = ({ ustAmount, astroAmount }) => {
  const state = useAuctionState();
  const config = useConfig();

  const shareOfPool = useMemo(() => {
    let value = 0;
    if (
      state == null ||
      num(state.total_ust_delegated).eq(0) ||
      num(state.total_astro_delegated).eq(0)
    ) {
      return value;
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

    value = ((shareOfPoolUst + shareOfPoolAstro) / 2) * 100;

    if (value > 100) {
      value = 100;
    }

    return value.toFixed(2);
  }, [astroAmount, ustAmount, state]);

  const lockEnds = useMemo(() => {
    if (config == null) {
      return null;
    }

    const timestamp =
      config.init_timestamp +
      config.deposit_window +
      config.withdrawal_window +
      config.lp_tokens_vesting_duration;

    return dayjs.unix(timestamp).format("DD/MM/YY");
  }, [config]);

  return {
    shareOfPool,
    lockEnds,
  };
};

export default useProvideFooter;
