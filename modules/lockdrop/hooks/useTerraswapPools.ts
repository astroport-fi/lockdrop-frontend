import { gql } from "graphql-request";

import { useContracts } from "modules/common";
import { useHive } from "hooks/useHive";
import { ONE_TOKEN } from "constants/constants";
import { useAddress } from "@arthuryeti/terra";

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

const createQuery = (contract, lpTokens, address) => {
  if (lpTokens.length === 0) {
    return;
  }

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

          balance${lp}: wasm {
            contractQuery(
              contractAddress: "${lp}"
              query: {
                balance: {
                  address: "${address}"
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
  const address = useAddress();

  const query = createQuery(lockdrop, terraswapLps, address);

  const result = useHive({
    name: "terraswap-pools",
    query,
    options: {
      enabled: !!query,
    },
  });

  if (result == null) {
    return [];
  }

  return terraswapLps.map((key) => {
    const { incentives_share, terraswap_amount_in_lockups, terraswap_pool } =
      result[key].contractQuery;
    const { balance } = result[`balance${key}`].contractQuery;

    console.log(balance);

    // TODO: change to use parse terra amount
    const astroAllocated = incentives_share / ONE_TOKEN;
    return {
      name: key,
      totalLiquidity: +terraswap_amount_in_lockups / ONE_TOKEN,
      myLiquidity: +balance / ONE_TOKEN,
      dualRewards: true,
      terraswapPool: terraswap_pool,
      astroAllocated,
    };
  });
};

export default useTerraswapPools;
