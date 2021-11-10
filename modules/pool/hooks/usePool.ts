import { useMemo } from "react";
import { num, useBalance } from "@arthuryeti/terra";

import { useGetPool, useShareOfPool, useLpToTokens } from "modules/pool";
import { Asset, getTokenDenom } from "modules/common";

export type Pool = {
  assets: [Asset, Asset];
  total: {
    share: string;
  };
  mine: {
    share: string;
    shareOfPool: string | null;
  };
  token1: {
    asset: string;
    share: string;
    amount: string | undefined;
  };
  token2: {
    asset: string;
    share: string;
    amount: string | undefined;
  };
};

type Params = {
  pairContract: string;
  lpTokenContract: string;
};

export const usePool = ({
  pairContract,
  lpTokenContract,
}: Params): Pool | null => {
  const { data: pool } = useGetPool(pairContract);
  const lpBalance = useBalance(lpTokenContract);
  const shareOfPool = useShareOfPool({ pool, amount1: lpBalance });
  const stakedAmount = "0";
  // const stakedAmount = useStakedLpAmount(lpTokenContract);
  const tokenAmounts = useLpToTokens({ pool, amount: lpBalance });
  const myShare = num(stakedAmount).plus(lpBalance).toString();

  const token1 = useMemo(() => {
    if (pool == null) {
      return null;
    }

    return getTokenDenom(pool.assets[0].info);
  }, [pool]);

  const token2 = useMemo(() => {
    if (pool == null) {
      return null;
    }

    return getTokenDenom(pool.assets[1].info);
  }, [pool]);

  return useMemo(() => {
    if (pool == null || token1 == null || token2 == null) {
      return null;
    }

    return {
      assets: pool.assets,
      total: {
        share: pool.total_share,
      },
      mine: {
        share: myShare,
        shareOfPool,
      },
      token1: {
        asset: token1,
        share: pool.assets[0].amount,
        amount: tokenAmounts?.[token1],
      },
      token2: {
        asset: token2,
        share: pool.assets[1].amount,
        amount: tokenAmounts?.[token2],
      },
    };
  }, [pool, myShare, shareOfPool, tokenAmounts, token1, token2]);
};

export default usePool;
