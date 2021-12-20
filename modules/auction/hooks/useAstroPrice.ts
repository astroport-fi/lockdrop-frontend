import { num } from "@arthuryeti/terra";

import { useAuctionState } from "modules/auction";

export const useAstroPrice = () => {
  const auctionState = useAuctionState();
  const totalAstro = auctionState?.total_astro_delegated;
  const totalUusd = auctionState?.total_ust_delegated;
  const finalPrice = num(totalUusd).div(totalAstro).toFixed(2);

  if (!num(totalAstro).gt(0)) {
    return "0";
  }

  return finalPrice;
};

export default useAstroPrice;
