import { useMemo } from "react";
import dayjs from "dayjs";
import { num } from "@arthuryeti/terra";

import { useLockedLpAmount, useConfig, useUserInfo } from "modules/lockdrop";
import { ONE_TOKEN } from "constants/constants";

type Opts = {
  lpToken: string;
  duration: number;
};

export const useLockdropLogic = ({ lpToken, duration }: Opts) => {
  const currentTimestamp = dayjs().unix();
  const config = useConfig();
  const userInfo = useUserInfo();
  const stakedAmount = useLockedLpAmount(lpToken);

  return useMemo(() => {
    let canDeposit = true;
    let canWithdraw = true;
    let max = num(stakedAmount).div(ONE_TOKEN).toNumber();

    if (config == null || userInfo == null) {
      return { canDeposit: false, canWithdraw: false, max };
    }

    const lockupInfo = userInfo.lockup_infos.find(
      (info) =>
        info.terraswap_lp_token === lpToken && info.duration === duration
    );

    const phaseOpenUntil =
      config.init_timestamp + config.deposit_window + config.withdrawal_window;
    const depositAllowedUntil = config.init_timestamp + config.deposit_window;
    const withdraw50PercentUntil =
      config.init_timestamp +
      config.deposit_window +
      config.withdrawal_window / 2;

    if (depositAllowedUntil < currentTimestamp) {
      canDeposit = false;
    }

    if (
      depositAllowedUntil < currentTimestamp &&
      currentTimestamp < withdraw50PercentUntil
    ) {
      max = max / 2;
    }

    if (phaseOpenUntil < currentTimestamp) {
      canDeposit = false;
      canWithdraw = false;
      max = 0;
    }

    if (
      withdraw50PercentUntil < currentTimestamp &&
      currentTimestamp < phaseOpenUntil
    ) {
      const units = num(lockupInfo.lp_units_locked)
        .div(ONE_TOKEN)
        .div(2)
        .toNumber();
      max =
        units *
        ((currentTimestamp - withdraw50PercentUntil) /
          (phaseOpenUntil - withdraw50PercentUntil));
    }

    return {
      canDeposit,
      canWithdraw,
      max,
    };
  }, [config, userInfo, currentTimestamp, stakedAmount, duration, lpToken]);
};

export default useLockdropLogic;