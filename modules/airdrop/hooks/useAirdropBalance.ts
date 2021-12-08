import { useMemo } from "react";
import { num, useAddress } from "@arthuryeti/terra";

import { useAirdrop, useUserInfo } from "modules/airdrop";

export const useAirdropBalance = () => {
  const address = useAddress();
  const airdrop = useAirdrop(address);
  const userInfo = useUserInfo();

  return useMemo(() => {
    if (userInfo == null) {
      return null;
    }

    if (num(userInfo.airdrop_amount).eq(0)) {
      return airdrop.amount;
    }

    return num(userInfo.airdrop_amount)
      .minus(userInfo.delegated_amount)
      .toString();
  }, [userInfo, airdrop]);
};

export default useAirdropBalance;
