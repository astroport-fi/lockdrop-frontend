import { useMemo } from "react";
import { num } from "@arthuryeti/terra";

import { useUserInfo } from "modules/lockdrop";
import {
  useUserInfo as useAuctionUserInfo,
  useAstroBalance,
} from "modules/auction";

export const useTotalAstroRewards = () => {
  const lockUserInfo = useUserInfo();
  const balance = useAstroBalance();
  const auctionUserInfo = useAuctionUserInfo();

  return useMemo(() => {
    if (lockUserInfo == null || auctionUserInfo == null || balance == null) {
      return null;
    }

    let phase2Amount = "0";

    if (auctionUserInfo.auction_incentive_amount != null) {
      phase2Amount = auctionUserInfo.auction_incentive_amount;
    }

    return num(balance.astroBalance).plus(phase2Amount).toString();
  }, [lockUserInfo, auctionUserInfo, balance]);
};

export default useTotalAstroRewards;
