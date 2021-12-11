import { useMemo } from "react";
import { num } from "@arthuryeti/terra";

import { useUserInfo } from "modules/lockdrop";
import { useAirdropBalance } from "modules/airdrop";

export const useAstroBalance = () => {
  const lockUserInfo = useUserInfo();
  const airdropBalance = useAirdropBalance();

  const lockdropBalance = useMemo(() => {
    if (lockUserInfo == null) {
      return null;
    }

    return num(lockUserInfo.total_astro_rewards)
      .minus(lockUserInfo.delegated_astro_rewards)
      .toString();
  }, [lockUserInfo]);

  return num(lockdropBalance).plus(airdropBalance).toString();
};

export default useAstroBalance;
