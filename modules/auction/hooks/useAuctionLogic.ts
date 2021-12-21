import { useMemo } from "react";
import dayjs from "dayjs";
import { num } from "@arthuryeti/terra";

import { useConfig, useUserInfo } from "modules/auction";
import { ONE_TOKEN } from "constants/constants";

export const useAuctionLogic = () => {
  const currentTimestamp = dayjs().unix();
  const currentTimestampWithBuffer = dayjs().add(10, "m").unix();
  const config = useConfig();
  const userInfo = useUserInfo();
  const balance = userInfo?.ust_delegated ?? "0";

  return useMemo(() => {
    let canDeposit = false;
    let canWithdraw = false;
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

    if (config.init_timestamp < currentTimestamp) {
      canDeposit = true;
      canWithdraw = true;
    }

    if (num(balance).div(ONE_TOKEN).eq(0)) {
      canWithdraw = false;
    }

    if (depositAllowedUntil < currentTimestamp) {
      canDeposit = false;

      if (userInfo?.ust_withdrawn) {
        canWithdraw = false;
      }
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

    let realMax = max;

    if (
      withdraw50PercentUntil < currentTimestamp &&
      currentTimestamp < phaseOpenUntil
    ) {
      const units = num(balance).div(ONE_TOKEN).div(2).toNumber();

      realMax =
        units *
        ((phaseOpenUntil - currentTimestamp) /
          (phaseOpenUntil - withdraw50PercentUntil));

      max =
        units *
        ((phaseOpenUntil - currentTimestampWithBuffer) /
          (phaseOpenUntil - withdraw50PercentUntil));

      realMax = num(realMax).dp(3).toNumber();
      max = num(max).dp(3).toNumber();
    }

    return {
      canDeposit,
      canWithdraw,
      max,
      realMax,
    };
  }, [config, userInfo, currentTimestamp, currentTimestampWithBuffer, balance]);
};

export default useAuctionLogic;
