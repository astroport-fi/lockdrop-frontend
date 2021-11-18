import { gql } from "graphql-request";

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

export const useTerraswapPools = () => {
  const { lockdrop, terraswapLps } = useContracts();
  const query = createQuery(lockdrop, terraswapLps);

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

  if (result == null) {
    return [];
  }

  return Object.keys(result).map((key) => {
    const { incentives_share, terraswap_amount_in_lockups, terraswap_pool } =
      result[key].contractQuery;

    // TODO: change to use parse terra amount
    const astroAllocated = incentives_share / ONE_TOKEN;
    return {
      name: key,
      totalMigrated: +terraswap_amount_in_lockups / ONE_TOKEN,
      myMigrated: 0,
      dualRewards: true,
      terraswapPool: terraswap_pool,
      astroAllocated,
    };
  });
};

export default useTerraswapPools;
