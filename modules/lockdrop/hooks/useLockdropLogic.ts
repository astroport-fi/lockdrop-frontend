import { useMemo } from "react";
import dayjs from "dayjs";

import { useConfig } from "modules/lockdrop";

export const useLockdropLogic = () => {
  const currentTimestamp = dayjs().unix();
  const config = useConfig();

  return useMemo(() => {
    let canDeposit = true;
    let canWithdraw = true;
    let ratio = 1;

    if (!config) {
      return { canDeposit: false, canWithdraw: false };
    }

    if (config.init_timestamp + config.deposit_window < currentTimestamp) {
      canDeposit = false;
    }

    if (
      config.init_timestamp +
        config.deposit_window +
        config.withdrawal_window / 2 <
      currentTimestamp
    ) {
      ratio = 0.5;
    }

    if (
      config.init_timestamp + config.deposit_window + config.withdrawal_window <
      currentTimestamp
    ) {
      canDeposit = false;
      canWithdraw = false;
      ratio = 1;
    }

    return {
      canDeposit,
      canWithdraw,
      ratio,
    };
  }, [config, currentTimestamp]);
};

export default useLockdropLogic;
