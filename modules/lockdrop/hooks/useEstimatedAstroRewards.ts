import { useMemo } from "react";
import { num } from "@arthuryeti/terra";

import { useConfig, useLockState, usePool } from "modules/lockdrop";

type Options = {
  duration: number;
  amount: string;
  lpToken: string;
};

export const useEstimatedAstroRewards = ({
  duration,
  amount,
  lpToken,
}: Options) => {
  const config = useConfig();
  const pool = usePool(lpToken);
  const lockState = useLockState();

  const lockupWeight = useMemo(() => {
    if (config == null || duration == 0) {
      return null;
    }

    return (
      1 + (duration - 1) * (config.weekly_multiplier / config.weekly_divider)
    );
  }, [config, duration]);

  const amountWeight = useMemo(() => {
    if (lockupWeight == null || num(amount).eq(0) || amount == "") {
      return null;
    }

    return num(amount).times(lockupWeight);
  }, [amount, lockupWeight]);

  return useMemo(() => {
    if (
      config == null ||
      pool == null ||
      lockState == null ||
      amountWeight == null
    ) {
      return null;
    }

    const first = num(pool.incentives_share).div(
      lockState.total_incentives_share
    );
    const second = num(amountWeight).div(
      num(pool.weighted_amount).plus(amountWeight)
    );

    return num(first)
      .times(second)
      .times(config.lockdrop_incentives)
      .toString();
  }, [amountWeight, pool, config, lockState]);
};

export default useEstimatedAstroRewards;
