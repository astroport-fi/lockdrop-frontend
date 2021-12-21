import { useMemo } from "react";
import { num, toTerraAmount } from "@arthuryeti/terra";
import dayjs from "dayjs";

import { useAuctionState, useConfig } from "modules/auction";
import { ONE_TOKEN } from "constants/constants";

export const useProvideFooter = ({ ustAmount, astroAmount }) => {
  const state = useAuctionState();
  const config = useConfig();

  const estAstroRewards = useMemo(() => {
    if (config == null || state == null) {
      return null;
    }

    if (
      state != null &&
      num(state.total_ust_delegated).eq(0) &&
      num(state.total_astro_delegated).eq(0)
    ) {
      return num(config.astro_incentive_amount).div(ONE_TOKEN).toNumber();
    }

    const astroIncentivesFromAstroDelgation = num(config.astro_incentive_amount)
      .times(0.5)
      .times(toTerraAmount(astroAmount))
      .div(num(state.total_astro_delegated).plus(toTerraAmount(astroAmount)));

    const astroIncentivesFromUstDelgation = num(config.astro_incentive_amount)
      .times(0.5)
      .times(toTerraAmount(ustAmount))
      .div(num(state.total_ust_delegated).plus(toTerraAmount(ustAmount)));

    return astroIncentivesFromAstroDelgation
      .plus(astroIncentivesFromUstDelgation)
      .div(ONE_TOKEN)
      .toNumber();
  }, [config, state, astroAmount, ustAmount]);

  const shareOfPool = useMemo(() => {
    if (config == null || estAstroRewards == null) {
      return null;
    }

    const incentive = num(config.astro_incentive_amount).div(ONE_TOKEN);

    return num(estAstroRewards).div(incentive).times(100).toFixed(2);
  }, [config, estAstroRewards]);

  const lockEnds = useMemo(() => {
    if (config == null) {
      return null;
    }

    const timestamp =
      config.init_timestamp +
      config.deposit_window +
      config.withdrawal_window +
      config.lp_tokens_vesting_duration;

    return dayjs.unix(timestamp).format("MMM/DD/YY");
  }, [config]);

  return {
    estAstroRewards,
    shareOfPool,
    lockEnds,
  };
};

export default useProvideFooter;
