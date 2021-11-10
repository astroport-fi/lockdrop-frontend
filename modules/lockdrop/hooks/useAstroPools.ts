import { num, useBalance, useTerraWebapp } from "@arthuryeti/terra";
import { gql } from "graphql-request";
import { useQuery } from "react-query";

import { useContracts } from "modules/common";
import useHive from "hooks/useHive";
import { ONE_TOKEN } from "constants/constants";
import { useUserInfo } from "modules/lockdrop";

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

export const useAstroPools = () => {
  const { lockdrop } = useContracts();
  const userInfo = useUserInfo();

  const balance = useBalance(
    "terra1phlrl6anpvmy98ukrnhrcexgnhj2kpfe6lxete",
    lockdrop
  );

  console.log(balance);

  const query = createQuery(lockdrop, [
    "terra1phlrl6anpvmy98ukrnhrcexgnhj2kpfe6lxete",
    "terra1smdjuw864plvjehr74s53qd83y8pqdytssucnv",
  ]);

  const pools = useHive({
    name: "astro-pools",
    query,
  });

  if (userInfo == null) {
    return [];
  }

  return userInfo.lockup_infos.map((info) => {
    return {
      name: info.astro_rewards,
      myLiquidity: +info.lp_units_locked / ONE_TOKEN,
      lockEnd: info.unlock_timestamp,
      astroRewards: +info.astro_rewards / ONE_TOKEN,
    };
  });

  // {
  //   "poolName": ""
  //   "myLockedAstroportLiquidity": "LockUpInfoResponse.lp_units_locked",
  //   "totalLockedAstroportLiquidity": "PoolResponse.migration_info.migration_info",
  //   "myLockEnds": "LockUpInfoResponse.unlock_timestamp",
  //   "Est. ASTRO Rewards": "LockUpInfoResponse.astro_rewards",
  //   "dualRewards": "",
  // }

  return "ouii";
};

export default useAstroPools;
