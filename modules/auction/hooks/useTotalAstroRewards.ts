import { useMemo } from "react";
import { num } from "@arthuryeti/terra";

import { useUserInfo } from "modules/lockdrop";
import { useUserInfo as useAuctionUserInfo } from "modules/auction";
import { useAirdropBalance } from "modules/airdrop";

export const useTotalAstroRewards = () => {
  const lockUserInfo = useUserInfo();
  const airdropBalance = useAirdropBalance();
  const auctionUserInfo = useAuctionUserInfo();

  return useMemo(() => {
    if (lockUserInfo == null || auctionUserInfo == null) {
      return null;
    }

    let phase2Amount = "0";

    if (auctionUserInfo.auction_incentive_amount != null) {
      phase2Amount = auctionUserInfo.auction_incentive_amount;
    }

    return num(lockUserInfo.total_astro_rewards).plus(airdropBalance).plus(phase2Amount).toString();
  }, [lockUserInfo, airdropBalance, auctionUserInfo]);
};

export default useTotalAstroRewards;
