import { useMemo } from "react";
import { num } from "@arthuryeti/terra";

import { useUserInfo } from "modules/airdrop";

export const useAirdropBalance = () => {
  const userInfo = useUserInfo();

  return useMemo(() => {
    if (userInfo == null) {
      return null;
    }

    return num(userInfo.airdrop_amount)
      .minus(userInfo.delegated_amount)
      .toString();
  }, [userInfo]);
};

export default useAirdropBalance;
