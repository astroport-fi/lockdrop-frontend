import { useTerraWebapp } from "@arthuryeti/terra";
import { gql } from "graphql-request";
import { useQuery } from "react-query";

import { useContracts } from "modules/common";
import { useHive } from "hooks/useHive";
import { ONE_TOKEN } from "constants/constants";

type Response = {
  terraswap_pool: string;
  terraswap_amount_in_lockups: string;
  incentives_share: string;
  weighted_amount: string;
  generator_astro_per_share: string;
  generator_proxy_per_share: string;
  is_staked: boolean;
  migration_info: {
    terraswap_migrated_amount: string;
    astroport_lp_token: string;
  };
};

const createQuery = (contract, lpTokens) => {
  return gql`
    {
      ${lpTokens.map((lp) => {
        return `
          ${lp}: wasm {
            contractQuery(
              contractAddress: "${contract}"
              query: {
                pool: {
                  terraswap_lp_token: "${lp}"
                }
              }
            )
          }
        `;
      })}
    }
`;
};

export const useTerraswapPools = (pools) => {
  const { lockdrop } = useContracts();
  const query = createQuery(lockdrop, [
    "terra1phlrl6anpvmy98ukrnhrcexgnhj2kpfe6lxete",
    "terra1smdjuw864plvjehr74s53qd83y8pqdytssucnv",
  ]);

  const result = useHive({
    name: "terraswap-pools",
    query,
  });

  // {
  //   "poolName": ""
  //   "totalMigratedTerraswapLiquidity": "PoolResponse.migration_info.migration_info",
  //   "myMigratedTerraswapLiquidity": "LockUpInfoResponse.lp_units_locked",
  //   "astroAllocatedToPool": "PoolResponse.incentives_share",
  //   "dualRewards": "",
  // }

  if (pools == null || result == null) {
    return [];
  }

  return pools.map((pool) => {
    const { incentives_share, terraswap_amount_in_lockups } =
      result[pool.liquidity_token].contractQuery;
    // TODO: change to use parse terra amount
    const astroAllocated = incentives_share / ONE_TOKEN;
    return {
      name: pool.liquidity_token,
      totalMigrated: +terraswap_amount_in_lockups / ONE_TOKEN,
      myMigrated: 0,
      dualRewards: true,
      astroAllocated,
    };
  });
};

export default useTerraswapPools;
