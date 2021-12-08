import { useMemo } from "react";
import dayjs from "dayjs";
import { num } from "@arthuryeti/terra";

import { useConfig, useUserInfo } from "modules/auction";
import { ONE_TOKEN } from "constants/constants";

export const useAuctionLogic = () => {
  const currentTimestamp = dayjs().unix();
  const config = useConfig();
  const userInfo = useUserInfo();
  const balance = userInfo?.ust_delegated ?? "0";

  return useMemo(() => {
    let canDeposit = true;
    let canWithdraw = true;
    let max = num(balance).div(ONE_TOKEN).toNumber();

    if (config == null || userInfo == null) {
      return { canDeposit: false, canWithdraw: false, max };
    }

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
      max =
        num(balance).div(ONE_TOKEN).div(2).toNumber() *
        ((currentTimestamp - withdraw50PercentUntil) /
          (phaseOpenUntil - withdraw50PercentUntil));
    }

    return {
      canDeposit,
      canWithdraw,
      max,
    };
  }, [config, userInfo, currentTimestamp, balance]);
};

export default useAuctionLogic;
